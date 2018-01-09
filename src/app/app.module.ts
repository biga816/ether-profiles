import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

// routes & components
import { AppComponent } from './app.component';
import { routes } from './app.routes';

// redux
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createEpics } from 'redux-observable-decorator';
import { IAppState, rootReducer } from './app.store';

// Epics
import { AppEpics } from './app.epics';
import { ProfileEpics } from './profile/profile.epics';
import { SearchEpics } from './search/search.epics';

// modules
import { SharedModule } from './shared/shared.module';
import { ProfileModule } from './profile/profile.module';
import { SearchModule } from './search/search.module';
import { HistoryModule } from './history/history.module';

// middleware
import { LocalstorageStore } from './../middleware/localstorage-store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    NgReduxModule,
    SharedModule,
    ProfileModule,
    SearchModule,
    HistoryModule
  ],
  providers: [
    // middleware
    AppEpics,
    ProfileEpics,
    SearchEpics,
    LocalstorageStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private appEpics: AppEpics,
    private profileEpics: ProfileEpics,
    private searchEpics: SearchEpics,
    localstorageStore: LocalstorageStore
  ) {
    // set middleware
    const middleware = [
      createEpics(appEpics),
      createEpics(profileEpics),
      createEpics(searchEpics),
      localstorageStore.middleware
    ];

    // set default state
    const persistedState = localStorage.getItem('history-state') ? { history: JSON.parse(localStorage.getItem('history-state')) } : {};

    ngRedux.configureStore(rootReducer, persistedState, middleware);
  }
}
