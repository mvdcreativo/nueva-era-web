(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{Aus5:function(t,e,r){"use strict";r.d(e,"a",(function(){return h}));var a=r("tk/3"),s=r("AytR"),o=r("IzEk"),n=r("lJxs"),i=r("2Vo4"),c=r("0LcH"),p=r("fXoL"),d=r("dNgK"),u=r("qXBG");let h=(()=>{class t{constructor(t,e,r){this._http=t,this._snackBar=e,this.authService=r,this.cuotas$=new i.a(null),this.id_medio_pago$=new i.a(null),this.totalResultSubject=new i.a(null),this.totalResult$=this.totalResultSubject.asObservable()}getOrders(){return this._http.get(`${s.a.API}order`).pipe(Object(o.a)(1))}getOrder(t){return this._http.get(`${s.a.API}order/${t}`).pipe(Object(o.a)(1))}addOrder(t){return this._http.post(`${s.a.API}order`,t).pipe(Object(o.a)(1))}deleteOrder(t){return this._http.delete(`${s.a.API}order/${t}`).pipe(Object(o.a)(1))}updateOrder(t,e){return this._http.put(`${s.a.API}order/${t}`,e).pipe(Object(o.a)(1))}getStatus(){return this._http.get(`${s.a.API}status`).pipe(Object(o.a)(1))}redirectNavegadorCobro(t){this.redirectForm(`${s.a.urlPago}/${t.id}`)}redirectForm(t){var e=document.createElement("form");e.target="_blank",e.method="GET",e.action=t,document.body.appendChild(e),e.submit()}findOrders(t="",e="asc",r=0,o=20){return this._http.get(`${s.a.API}order`,{params:(new a.d).set("page",r.toString()).set("filter",t).set("sortOrder",e).set("pageSize",o.toString())}).pipe(Object(n.a)(t=>(t.payload=t,this.totalResultSubject.next(t.total),t.payload)))}openSnackBar(t,e){let r;switch(t){case"success":r="toastSuccess";break;case"warn":r="toastWarn";break;case"error":default:r="toastError"}this._snackBar.openFromComponent(c.a,{data:e,panelClass:[r],verticalPosition:"top",duration:5e3})}}return t.\u0275fac=function(e){return new(e||t)(p.hc(a.b),p.hc(d.b),p.hc(u.a))},t.\u0275prov=p.Tb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);