# Generated by Django 4.0.3 on 2022-10-14 10:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_profile_state'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='aadhar_id',
            field=models.CharField(max_length=255, null=True),
        ),
    ]