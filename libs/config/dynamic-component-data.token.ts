import { InjectionToken } from '@angular/core';
import { BlockData, RoutesConfig } from './routes-config';

export const DynData = new InjectionToken<BlockData>("Dynamic Component Data")