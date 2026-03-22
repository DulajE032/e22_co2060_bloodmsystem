# Backend lint setup (Ruff)

This project uses Ruff for backend linting.

## What was fixed

- Moved deprecated Ruff keys in `pyproject.toml`:
  - `tool.ruff.select` -> `tool.ruff.lint.select`
  - `tool.ruff.ignore` -> `tool.ruff.lint.ignore`
- Added per-file ignore for migration line length (`E501`) in generated migration files only.
- Fixed tab indentation in `main/config/urls.py` (`W191`).

## Why migrations ignore `E501`

Django migration files are generated code. Reformatting long generated lines is unnecessary and can create noisy diffs.
So only migration files ignore `E501`; normal app code still follows line length rules.

## Commands

Run from `backEnd/main`:

```powershell
..\.venv\Scripts\python.exe -m ruff check . --fix
```

Check only (no autofix):

```powershell
..\.venv\Scripts\python.exe -m ruff check .
```

Run Django checks:

```powershell
..\.venv\Scripts\python.exe manage.py check
```

## Current status

- Ruff: `All checks passed!`
- Django check: one warning remains for missing static directory:
  - `backEnd/main/static` does not exist (from `STATICFILES_DIRS`).

