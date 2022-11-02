#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Oct 31 16:57:59 2022

@author: salma
"""

import pandas as pd
import os

# Loading, merging and filtering data
path = '/Users/salma/Documents/GitHub/CAPP30239-FA22/Raw Project Data'

peak_names = pd.read_csv(os.path.join(path, 'peak_data.csv'), 
                         usecols = ['PEAKID', 'PKNAME'])
mountain_data = pd.read_csv(os.path.join(path, 'members_data.csv'))

merged_data = peak_names.merge(mountain_data, on = 'PEAKID', how = 'outer')

everest = merged_data[merged_data['PEAKID'] == 'EVER']

# Cleaning data 

everest.columns

#combin first and last name cols
#df['full_name'] = df['first'] + ' ' + df['last']

everest['CLIMBER'] = everest['FNAME'].astype(str) + ' ' + everest['LNAME'].astype(str) 

everest = everest.drop(columns = ['PEAKID', 'MEMBID', 'AGE', 'BIRTHDATE', 
                                  'RESIDENCE', 'BCONLY', 'NOTTOBC', 
                                  'MSPEED', 'MHIGHPT', 'MPERHIGHPT', 'MSMTDATE1', 
                                  'MSMTDATE2', 'MSMTDATE3', 'MSMTTIME1', 
                                  'MSMTTIME2', 'MSMTTIME3', 'MROUTE1', 
                                  'MROUTE2', 'MROUTE3', 'MASCENT1', 'MASCENT2', 
                                  'MASCENT3', 'MO2NOTE', 'DEATHTYPE', 
                                  'DEATHHGTM', 'DEATHCLASS', 'AMS', 'WEATHER', 
                                  'INJURYTYPE', 'INJURYHGTM', 'MEMBERMEMO', 
                                  'NECROLOGY', 'MSMTBID', 'MSMTTERM', 'HCN', 
                                  'MCHKSUM', 'MSMTNOTE1', 'MSMTNOTE2', 
                                  'MSMTNOTE3', 'DEATHRTE'])

everest.to_csv('everest.csv')

#Sherpa

sherpa_everest = everest[everest['SHERPA'] == True]
avg_climb_sherpa = sherpa_everest.groupby(['FNAME', 'YOB'])['CLIMBER'].count().reset_index()
avg_climb_sherpa.head()

avg_climb_sherpa['CLIMBER'].describe()

#AGE

climber_age = everest.groupby('CALCAGE')['CLIMBER'].count()
climber_age

#SEX

climber_sex = everest.groupby('SEX')['CLIMBER'].count()
climber_sex

#CITIZEN

climber_citizenship = everest.groupby('CITIZEN')['CLIMBER'].count()
climber_citizenship

#DO OCCUPATION LATER
#climber_occupation = everest.groupby('OCCUPATION')['CLIMBER'].count()
#climber_occupation


#MSUCCESS

climber_success = everest.groupby('MSUCCESS')['CLIMBER'].count()
climber_success

#MO2USED

climber_oxygen = everest.groupby('MO2USED')['CLIMBER'].count()
climber_oxygen

#DEATH

climber_death = everest.groupby('DEATH')['CLIMBER'].count()
climber_death

#INJURY

climber_injury = everest.groupby('INJURY')['CLIMBER'].count()
climber_injury



