from datetime import timedelta

from django.db import models
from django.utils import timezone

from ..models.donorAlert import DonorAlert
from ..models.donorDetails import DonorDetails


def trigger_emergency_alerts(blood_group, request_id):
    # Limit to maximum 30 donors to avoid flood
    # Cooldown: 24 hours
    cooldown_time = timezone.now() - timedelta(hours=24)

    # Get eligible donors matching blood group
    eligible_donors = DonorDetails.objects.filter(
        user__profile__blood_group=blood_group,
        is_available=True
    )

    # Filter by cooldown (either never alerted, or alerted before cooldown time)
    # And filter by general eligibility (last donation > 90 days ago)
    # The property is_eligible cannot be used in a Django ORM filter directly,
    # so we filter last_donation_date directly in DB.
    ninety_days_ago = timezone.now().date() - timedelta(days=90)

    donors_to_alert = eligible_donors.filter(
        models.Q(last_alerted_at__isnull=True) | models.Q(last_alerted_at__lt=cooldown_time),
        models.Q(last_donation_date__isnull=True) | models.Q(last_donation_date__lte=ninety_days_ago)
    )[:30]

    alerts = []
    for donor in donors_to_alert:
        alerts.append(
            DonorAlert(
                donor=donor,
                message=f"URGENT: Blood group {blood_group} is needed immediately. Please visit the hospital if you can donate.",
                alert_type="urgent",
                related_url=f"/donor/urgent-request/{request_id}"
            )
        )
        # Update last alerted at
        donor.last_alerted_at = timezone.now()
        donor.save(update_fields=['last_alerted_at'])

    DonorAlert.objects.bulk_create(alerts)
    return len(alerts)
