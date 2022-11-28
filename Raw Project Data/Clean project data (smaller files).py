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
datapath = '/Users/salma/Documents/GitHub/CAPP30239-FA22/data'

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

everest.to_csv(os.path.join(datapath,'everest.csv'))

#injury parallel

injury_parallel = everest.groupby(['SHERPA', 'INJURY'])['PKNAME'].count().reset_index()
injury_parallel.rename({'SHERPA': 'source', 
                        'INJURY': 'target', 
                        'PKNAME':'prop'}, 
                       axis=1, inplace=True)
injury_parallel['source'] = injury_parallel['source'].map({False: 'non-sherpa', True: 'sherpa'})
injury_parallel['target'] = injury_parallel['target'].map({False: 'not injured', True: 'injured'})
injury_parallel['total'] = [16368, 16368, 6258, 6258]
injury_parallel['value'] = injury_parallel['prop']/injury_parallel['total'] *100
injury_parallel.to_csv(os.path.join(datapath,'injury_parallel.csv'))



#everest deaths

everest_deaths = everest[everest['DEATH'] == True]
everest_deaths = everest_deaths.drop(columns = ['PKNAME', 'EXPID', 'MSEASON', 'INJURY', 'MO2USED', 'FNAME', 'LNAME', 'YOB',
       'CALCAGE', 'STATUS', 'OCCUPATION', 'LEADER', 'DEPUTY', 'SUPPORT', 'DISABLED', 'HIRED', 'TIBETAN', 'MSUCCESS',
       'MCLAIMED', 'MDISPUTED', 'MSOLO', 'MTRAVERSE', 'MSKI', 'MPARAPENTE', 'MO2NONE', 'MO2CLIMB', 'MO2DESCENT', 'MO2SLEEP',
       'MO2MEDICAL', 'DEATH', 'DEATHDATE', 'DEATHTIME', 'INJURYDATE',
       'INJURYTIME'])
everest_deaths['SHERPA'] = everest_deaths['SHERPA'].map({False: 'non-sherpa', True: 'sherpa'})
everest_deaths.insert(0, 'CLIMBER', everest_deaths.pop('CLIMBER'))
everest_deaths.to_csv(os.path.join(datapath,'everest_deaths.csv'))

#everest_deaths_year = everest_deaths.groupby(['MYEAR', 'SHERPA'])['PKNAME'].count().reset_index()
#everest_deaths_year.to_csv(os.path.join(datapath,'everest_deaths_year.csv'))

#everest oxygen
everest.columns
everest_oxygen = everest.drop(columns=['EXPID', 'MSEASON', 'YOB', 'CITIZEN', 'STATUS', 'OCCUPATION', 'LEADER', 'DEPUTY',
       'SUPPORT', 'DISABLED', 'HIRED', 'TIBETAN', 'MSUCCESS',
       'MCLAIMED', 'MDISPUTED', 'MSOLO', 'MTRAVERSE', 'MSKI', 'MPARAPENTE', 'MO2NONE', 'MO2CLIMB', 'MO2DESCENT', 'MO2SLEEP',
       'MO2MEDICAL', 'DEATH', 'DEATHDATE', 'DEATHTIME', 'INJURY', 'INJURYDATE',
       'INJURYTIME', 'DEATHNOTE'])
everest_oxygen['SHERPA'] = everest_oxygen['SHERPA'].map({False: 'non-sherpa', True: 'sherpa'})
everest_oxygen['MO2USED'] = everest_oxygen['MO2USED'].map({False: '02 not used', True: '02 used'})

oxygen_use = everest_oxygen.groupby(['MO2USED', 'SHERPA'])['PKNAME'].count().reset_index()
oxygen_use.rename({'SHERPA': 'source', 
                        'MO2USED': 'target', 
                        'PKNAME':'value'}, 
                       axis=1, inplace=True)
oxygen_use.to_csv(os.path.join(datapath, 'oxygen_use.csv'))

#everest injured

everest_injured = everest[everest['INJURY'] == True]
everest_injured.to_csv(os.path.join(datapath,'everest_injured.csv'))

#everest success

everest_summit = everest[everest['MSUCCESS'] == True]
everest_summit.to_csv(os.path.join(datapath,'everest_summit.csv')) 

#Sherpa average climb

sherpa_everest = everest_summit[everest_summit['SHERPA'] == True]
avg_climb_sherpa = sherpa_everest.groupby(['CLIMBER', 'YOB'])['PKNAME'].count().reset_index()
avg_climb_sherpa['Sher'] = pd.Series(['Sherpa' for x in range(len(avg_climb_sherpa.index))])
avg_climb_sherpa.head()

sherpa_summit_dist = avg_climb_sherpa['PKNAME'].describe().reset_index()
sherpa_summit_dist.rename({'PKNAME': 'Sherpa'}, axis=1, inplace=True)

#Non-sherpa average climb

climber_everest = everest_summit[everest_summit['SHERPA'] == False]
avg_climb_climber = climber_everest.groupby(['CLIMBER', 'YOB'])['PKNAME'].count().reset_index()
avg_climb_climber['Sher'] = pd.Series(['Non-sherpa' for x in range(len(avg_climb_climber.index))])
avg_climb_climber.head()

climber_summit_dist = avg_climb_climber['PKNAME'].describe().reset_index()
climber_summit_dist.rename({'PKNAME':'Climber'}, axis=1, inplace=True)

#Summit dist
summit_dist = sherpa_summit_dist.merge(climber_summit_dist, on='index', how='inner')
summit_dist.to_csv(os.path.join(datapath,'summit_dist.csv'))

#Avg climb rainplot
avg_climb_merge = pd.concat([avg_climb_sherpa, avg_climb_climber])
avg_climb_merge.to_csv(os.path.join(datapath, 'avg_climb.csv'))

#climb count
climb_count = avg_climb_merge.drop(columns = ['CLIMBER', 'YOB', 'Sher'])
climb_count.to_csv(os.path.join(datapath, 'climb.csv'))

#avg_climber = climber_everest.groupby(['CLIMBER', 'YOB']).count().reset_index()
#avg_climber.head()

#avg_climber['CLIMBER'].describe()

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



