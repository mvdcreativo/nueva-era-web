(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{Aus5:function(t,e,r){"use strict";r.d(e,"a",(function(){return d}));var a=r("tk/3"),o=r("AytR"),s=r("IzEk"),c=r("lJxs"),i=r("2Vo4"),n=r("0LcH"),u=r("fXoL"),l=r("dNgK"),p=r("qXBG");let d=(()=>{class t{constructor(t,e,r){this._http=t,this._snackBar=e,this.authService=r,this.cuotas$=new i.a(null),this.id_medio_pago$=new i.a(null),this.totalResultSubject=new i.a(null),this.totalResult$=this.totalResultSubject.asObservable()}getOrders(){return this._http.get(`${o.a.API}order`).pipe(Object(s.a)(1))}getOrder(t){return this._http.get(`${o.a.API}order/${t}`).pipe(Object(s.a)(1))}addOrder(t){return this._http.post(`${o.a.API}order`,t).pipe(Object(s.a)(1))}deleteOrder(t){return this._http.delete(`${o.a.API}order/${t}`).pipe(Object(s.a)(1))}updateOrder(t,e){return this._http.put(`${o.a.API}order/${t}`,e).pipe(Object(s.a)(1))}registrarCliente(t){if(null===this.authService.currentUserValue.user.id_cliente_cobrosya)return this._http.post(`${o.a.API}registro_cliente_cobrosya`,t).pipe(Object(s.a)(1))}crearTalon(t,e,r){const a={order:t,cuotas:r,method:e,user:this.authService.currentUserValue.user,urlRedirect:`${o.a.urlRedirectPago}${t.id}/${e}`};if(console.log(a),this.authService.currentUserValue.user.id_cliente_cobrosya)return this._http.post(`${o.a.API}crear_talon_cobrosya`,a).pipe(Object(s.a)(1))}redirectNavegadorCobro(t,e,r,a){const c=this.authService.currentUserValue.user.id_cliente_cobrosya,i={nro_talon:e,order:t,cuotas:a,method:r,user:c};console.log(i),this._http.post(`${o.a.API}firma-cobrosya`,i).pipe(Object(s.a)(1)).subscribe(t=>{console.log(t);const r={nro_talon:e,id_medio_pago:i.method,id_cliente_cobrosya:c,cuotas:a,id_tarjeta:"",cvv2:"",terminal:"",firma:t};r.firma&&(console.log(r),this.post(r,"http://api-sandbox5.cobrosya.com/v5.5/cobrar-talon"))})}post(t,e){var r=document.createElement("form");r.target="_blank",r.method="POST",r.action=e,Object.keys(t).forEach((function(e){var a=document.createElement("input");a.type="hidden",a.name=e,a.setAttribute("value",t[e]),r.appendChild(a)})),document.body.appendChild(r),r.submit()}findOrders(t="",e="asc",r=1,s=20){return this._http.get(`${o.a.API}order`,{params:(new a.d).set("page",r.toString()).set("filter",t).set("sortOrder",e).set("pageSize",s.toString())}).pipe(Object(c.a)(t=>(t.payload=t,this.totalResultSubject.next(t.total),t.payload)))}openSnackBar(t,e){let r;switch(t){case"success":r="toastSuccess";break;case"warn":r="toastWarn";break;case"error":default:r="toastError"}this._snackBar.openFromComponent(n.a,{data:e,panelClass:[r],verticalPosition:"top",duration:5e3})}}return t.\u0275fac=function(e){return new(e||t)(u.hc(a.b),u.hc(l.b),u.hc(p.a))},t.\u0275prov=u.Tb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);