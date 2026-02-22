from django.db import models
from User.models import User
from datetime import date, timedelta

__all__=[User]
class Donor(models.Model):
  #donor id auto
  donor=models.ForeignKey(User,on_delete=models.CASCADE,unique=True)
  name=models.CharField(max_length=30)
  phone=models.CharField(max_length=10)
  dob=models.DateField()


  gender_type = (
      ("MALE", "male"),
      ("FEMALE", "female"),

  )

  gender=models.CharField(choices=gender_type,default='MALE')
  @property
  def getAge(self):
      today=date.today()
      age=today.year - self.dob.year - ((today.month, today.day) < (self.dob.month, self.dob.day))
      return age

  BloodGroup=(
      ("A+","A+ group"),
      ("B+", "B+ group"),
    ("AB+", "AB+ group"),
    ("O+", "O+ group"),

  )

  bloodGroup=models.CharField(choices=BloodGroup,default="A+" )
  address=models.CharField(max_length=30,blank=True)
  city=models.CharField(max_length=30,blank=True)
  latitude = models.DecimalField(
      max_digits=9,
      decimal_places=6,
      blank=True,
      null=True
  )

  longitude = models.DecimalField(
      max_digits=9,
      decimal_places=6,
      blank=True,
      null=True
  )


  last_don = models.DateField(
      verbose_name="Last Donation Date",
      blank=True,
      null=True
  )


  @property
  def is_eligible(self):

      if self.last_don is None:
          return True

      today = date.today()

      eligibility_date = self.last_don + timedelta(days=56)

      return today >= eligibility_date

  def __str__(self):
      status = "Eligible" if self.is_eligible else "Not Eligible Yet"
      return f"Donor ID {self.pk} - {status}"

