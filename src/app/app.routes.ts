// angular
import { Routes } from '@angular/router';

// component
import { ProfileTopComponent } from './profile/profile-top/profile-top.component';
import { SearchTopComponent } from './search/search-top/search-top.component';
import { HistoryTopComponent } from './history/history-top/history-top.component';

export const routes: Routes = [
  { path: '', component: ProfileTopComponent},
  { path: 'search', component: SearchTopComponent},
  { path: 'history', component: HistoryTopComponent},
  { path: '**', redirectTo: '' }
];
