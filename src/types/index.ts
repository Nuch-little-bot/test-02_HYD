export type ImpactId =
  | 'environmental'
  | 'social'
  | 'economic'
  | 'circularity'
  | 'mobility'
  | 'health';

export interface MetricItem {
  label: string;
  labelZh: string;
  value: string;
  unit?: string;
  detail: string;
  detailZh: string;
}

export interface ImpactAttribute {
  id: ImpactId;
  title: string;
  titleZh: string;
  kicker: string;
  kickerZh: string;
  shortSummary: string;
  shortSummaryZh: string;
  fullDescription: string;
  fullDescriptionZh: string;
  keyMetrics: MetricItem[];
  elderlyBenefits: string[];
  elderlyBenefitsZh: string[];
  districtHighlights: {
    district: string;
    districtZh: string;
    impact: string;
    impactZh: string;
  }[];
  relatedProjectIds: number[];
  recommendations: string[];
  recommendationsZh: string[];
}

export interface ProjectData {
  id: number;
  nameZh: string;
  nameEn: string;
  statusZh: string;
  statusEn: string;
  keyFiguresEn: string;
  source: string;
  osmUrl?: string;
  areaHa?: number;
  lat?: number;
  lng?: number;
  category: string;
  impacts: Record<ImpactId, string>;
  impactsZh: Record<ImpactId, string>;
}

export interface DistrictData {
  code: string;
  nameZh: string;
  nameEn: string;
  areaKm2: number;
  villageCount: number;
  oldDowntown: boolean;
  center: [number, number]; // [lng, lat]
  description: string;
  descriptionZh: string;
}

export interface ZoningArea {
  zoneZh: string;
  zoneEn: string;
  areaHa: number;
  sharePct: number;
  category: 'residential' | 'commercial' | 'innovation' | 'economic' | 'education' | 'religion' | 'public';
}

export type ThemeMode = 'crisp' | 'paper' | 'dark' | 'yellow';
export type FontSize = 'normal' | 'large' | 'xlarge';
