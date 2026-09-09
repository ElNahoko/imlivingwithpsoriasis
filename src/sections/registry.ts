import type { ComponentType } from 'react'
import {
  IconApple, IconBodyScan, IconBolt, IconBook, IconCircleCheck, IconFirstAidKit,
  IconHeartHandshake, IconLayoutGrid, IconMicroscope, IconNotebook, IconPill,
  IconQuestionMark, IconStethoscope, IconWind, type Icon,
} from '@tabler/icons-react'
import { BodyMap } from './BodyMap'
import { HowItWorks } from './HowItWorks'
import { Types } from './Types'
import { Triggers } from './Triggers'
import { Stress } from './Stress'
import { Food } from './Food'
import { Habits } from './Habits'
import { Treatments } from './Treatments'
import { FlarePlan } from './FlarePlan'
import { LivingWell } from './LivingWell'
import { Diary } from './Diary'
import { DoctorPrep } from './DoctorPrep'
import { Myths } from './Myths'
import { Sources } from './Sources'

export type SectionId =
  | 'body' | 'how' | 'types' | 'triggers' | 'stress' | 'food' | 'habits'
  | 'treatments' | 'flare' | 'living' | 'diary' | 'doctor' | 'myths' | 'sources'

export type SectionGroup = 'Understand' | 'Manage' | 'Live' | 'About'

export type Section = {
  id: SectionId
  title: string
  group: SectionGroup
  icon: Icon
  Component: ComponentType
}

export const SECTIONS: Section[] = [
  { id: 'body', title: 'Body map', group: 'Understand', icon: IconBodyScan, Component: BodyMap },
  { id: 'how', title: 'How it works', group: 'Understand', icon: IconMicroscope, Component: HowItWorks },
  { id: 'types', title: 'Types & signs', group: 'Understand', icon: IconLayoutGrid, Component: Types },
  { id: 'triggers', title: 'Flare triggers', group: 'Manage', icon: IconBolt, Component: Triggers },
  { id: 'stress', title: 'Stress & skin', group: 'Manage', icon: IconWind, Component: Stress },
  { id: 'food', title: 'Food & drink', group: 'Manage', icon: IconApple, Component: Food },
  { id: 'habits', title: 'Daily habits', group: 'Manage', icon: IconCircleCheck, Component: Habits },
  { id: 'treatments', title: 'Treatments', group: 'Manage', icon: IconPill, Component: Treatments },
  { id: 'flare', title: 'Flare plan', group: 'Manage', icon: IconFirstAidKit, Component: FlarePlan },
  { id: 'living', title: 'Living well', group: 'Live', icon: IconHeartHandshake, Component: LivingWell },
  { id: 'diary', title: 'Skin diary', group: 'Live', icon: IconNotebook, Component: Diary },
  { id: 'doctor', title: 'Doctor visit prep', group: 'Live', icon: IconStethoscope, Component: DoctorPrep },
  { id: 'myths', title: 'Myth check', group: 'Live', icon: IconQuestionMark, Component: Myths },
  { id: 'sources', title: 'Sources & credits', group: 'About', icon: IconBook, Component: Sources },
]

export const GROUPS: SectionGroup[] = ['Understand', 'Manage', 'Live', 'About']
export const sectionById = (id: SectionId) => SECTIONS.find((s) => s.id === id)!
