# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-13 05:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20171113_0342'),
    ]

    operations = [
        migrations.AddField(
            model_name='bridgetable',
            name='trick',
            field=models.CharField(default='', max_length=12),
        ),
    ]