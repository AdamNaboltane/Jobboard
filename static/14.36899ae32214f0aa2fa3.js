(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{cRhG:function(e,r,t){"use strict";t.r(r),t.d(r,"ProfileModule",(function(){return I}));var o=t("ofXK"),a=t("3Pt+"),i=t("fXoL"),n=t("lGQG"),s=t("qfBg"),l=t("dNgK"),m=t("kmnG"),p=t("qFsG"),f=t("tmjD"),c=t("bTqV");function b(e,r){1&e&&(i.Rb(0,"mat-error"),i.Cc(1," Please enter a valid email address "),i.Qb())}function u(e,r){1&e&&(i.Rb(0,"mat-error"),i.Cc(1," Email is "),i.Rb(2,"strong"),i.Cc(3,"required"),i.Qb(),i.Qb())}function d(e,r){1&e&&(i.Rb(0,"mat-error"),i.Cc(1," First name is "),i.Rb(2,"strong"),i.Cc(3,"required"),i.Qb(),i.Qb())}function h(e,r){1&e&&(i.Rb(0,"mat-error"),i.Cc(1," Last name is "),i.Rb(2,"strong"),i.Cc(3,"required"),i.Qb(),i.Qb())}function g(e,r){1&e&&(i.Rb(0,"mat-error"),i.Cc(1," Invalid informations! "),i.Qb())}let C=(()=>{class e{constructor(e,r,t){this.auth=e,this.user=r,this.snackBar=t,this.profileForm=new a.d({firstName:new a.b("",[a.p.required]),lastName:new a.b("",[a.p.required]),email:new a.b("",[a.p.required,a.p.email]),phone:new a.b("",[a.p.pattern("[0-9\\s]{10}")]),password:new a.b("")}),this.invalidUpdate=!1}ngOnInit(){this.getUserInfos()}getUserInfos(){this.user.getUser(this.auth.userInfos.id).subscribe(e=>{this.auth.userInfos=e,this.profileForm.get("firstName").setValue(e.f_name),this.profileForm.get("lastName").setValue(e.l_name),this.profileForm.get("email").setValue(e.email),this.profileForm.get("phone").setValue(e.phone)})}updateProfile(){const e=this.profileForm.value;this.invalidUpdate=!1,this.user.updateUser({id:this.auth.userInfos.id,f_name:e.firstName,l_name:e.lastName,email:e.email,phone:e.phone,access:null,password:e.password}).subscribe(e=>{e?(this.getUserInfos(),this.snackBar.open("Successfully updated your profile!","Dismiss",{duration:2e3})):this.invalidUpdate=!0},e=>this.invalidUpdate=!0)}}return e.\u0275fac=function(r){return new(r||e)(i.Lb(n.a),i.Lb(s.a),i.Lb(l.a))},e.\u0275cmp=i.Fb({type:e,selectors:[["app-profile"]],decls:34,vars:7,consts:[[1,"profile-wrapper","mat-elevation-z6"],[1,"profile-form",3,"formGroup","ngSubmit"],["matInput","","formControlName","email","placeholder","Ex. mrodrigue@outlook.com"],[4,"ngIf"],["type","password","matInput","","formControlName","password","placeholder","Your password"],["matInput","","formControlName","firstName","placeholder","Michel"],["matInput","","formControlName","lastName","placeholder","Rodrigue"],["matInput","","formControlName","phone","placeholder","06 12 34 56 78","mask","00 00 00 00 00"],[1,"button-wrapper"],["mat-flat-button","","color","primary",3,"disabled"]],template:function(e,r){1&e&&(i.Rb(0,"div",0),i.Rb(1,"h1"),i.Cc(2,"Your profile"),i.Qb(),i.Rb(3,"form",1),i.Zb("ngSubmit",(function(){return r.updateProfile()})),i.Rb(4,"mat-form-field"),i.Rb(5,"mat-label"),i.Cc(6,"Email"),i.Qb(),i.Mb(7,"input",2),i.Ac(8,b,2,0,"mat-error",3),i.Ac(9,u,4,0,"mat-error",3),i.Qb(),i.Rb(10,"mat-form-field"),i.Rb(11,"mat-label"),i.Cc(12,"Password"),i.Qb(),i.Mb(13,"input",4),i.Rb(14,"mat-hint"),i.Cc(15,"Leave empty if you don't want to change it"),i.Qb(),i.Qb(),i.Rb(16,"mat-form-field"),i.Rb(17,"mat-label"),i.Cc(18,"First name"),i.Qb(),i.Mb(19,"input",5),i.Ac(20,d,4,0,"mat-error",3),i.Qb(),i.Rb(21,"mat-form-field"),i.Rb(22,"mat-label"),i.Cc(23,"Last name"),i.Qb(),i.Mb(24,"input",6),i.Ac(25,h,4,0,"mat-error",3),i.Qb(),i.Rb(26,"mat-form-field"),i.Rb(27,"mat-label"),i.Cc(28,"Phone (optional)"),i.Qb(),i.Mb(29,"input",7),i.Qb(),i.Ac(30,g,2,0,"mat-error",3),i.Rb(31,"div",8),i.Rb(32,"button",9),i.Cc(33,"Update my profile"),i.Qb(),i.Qb(),i.Qb(),i.Qb()),2&e&&(i.Ab(3),i.kc("formGroup",r.profileForm),i.Ab(5),i.kc("ngIf",r.profileForm.get("email").hasError("email")&&!r.profileForm.get("email").hasError("required")),i.Ab(1),i.kc("ngIf",r.profileForm.get("email").hasError("required")),i.Ab(11),i.kc("ngIf",r.profileForm.get("firstName").hasError("required")),i.Ab(5),i.kc("ngIf",r.profileForm.get("lastName").hasError("required")),i.Ab(5),i.kc("ngIf",r.invalidUpdate),i.Ab(2),i.kc("disabled",r.profileForm.invalid))},directives:[a.q,a.k,a.e,m.c,m.g,p.a,a.a,a.j,a.c,o.k,m.f,f.a,c.b,m.b],styles:["[_nghost-%COMP%]{height:100%}[_nghost-%COMP%], [_nghost-%COMP%]   .profile-wrapper[_ngcontent-%COMP%]{padding:20px;display:flex;flex-direction:column;align-items:center;justify-content:center}[_nghost-%COMP%]   .profile-wrapper[_ngcontent-%COMP%]{width:50%;min-width:300px;background-color:#fff}[_nghost-%COMP%]   .profile-wrapper[_ngcontent-%COMP%]   .profile-form[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center}[_nghost-%COMP%]   .profile-wrapper[_ngcontent-%COMP%]   .profile-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%}"]}),e})();var w=t("tyNb");const R=[{path:"",component:C}];let Q=(()=>{class e{}return e.\u0275mod=i.Jb({type:e}),e.\u0275inj=i.Ib({factory:function(r){return new(r||e)},imports:[[w.d.forChild(R)],w.d]}),e})(),I=(()=>{class e{}return e.\u0275mod=i.Jb({type:e}),e.\u0275inj=i.Ib({factory:function(r){return new(r||e)},imports:[[o.c,Q,a.f,a.o,f.b.forRoot(),p.b,c.c]]}),e})()}}]);