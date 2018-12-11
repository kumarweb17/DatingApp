import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { ListsComponent } from "./lists/lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { AuthGuard } from "./_guards/auth.guard";
import { MemberDetialComponent } from "./members/member-detial/member-detial.component";
import { MemberDetailResolver } from './_resolvers/memberdetail.resolver';
import { MemberListResolver } from "./_resolvers/memberlist.resolver";

export const appRoutes :Routes=[

    {path:'',component:HomeComponent},

     {
       path:"",
       runGuardsAndResolvers:'always',
       canActivate:[AuthGuard],
       children:[
        {path:'members',component:MemberListComponent,
                                resolve:{users: MemberListResolver}  },
        {path:'members/:id',component:MemberDetialComponent,
                              resolve:{user: MemberDetailResolver}   },
        
        {path:'lists', component:ListsComponent}, 
        {path:'messages', component:MessagesComponent},
       ]
     },

    { path:'**', redirectTo:'',pathMatch:'full'}

]