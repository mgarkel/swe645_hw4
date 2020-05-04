import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyComponent } from './survey/survey.component'
import { ResultComponent } from './result/result.component'

const routes: Routes = [

    {//the survey and result paths
        path: 'survey',
        component: SurveyComponent,
    },
    {
        path: 'result',
        component: ResultComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
export const routingComponents = [SurveyComponent, ResultComponent];