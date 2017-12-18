# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-12-18 06:13
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20171218_0443'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bridgetable',
            name='seats',
        ),
        migrations.AddField(
            model_name='seats',
            name='table',
            field=models.OneToOneField(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.BridgeTable'),
        ),
    ]
