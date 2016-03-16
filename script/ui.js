/**
 * Created by Exbo on 2016/2/13.
 */

Element.prototype.setColor=function(color){
    this.style.color=color;
    return this;
};
Element.prototype.setBGColor=function(color){
    this.style.backgroundColor=color;
    return this;
};
Element.prototype.setText=function(text){
    this.innerHTML=text;
    return this;
};
Element.prototype.setClass=function(text){
    this.className=text;
    return this;
};
Element.prototype.setEdit=function(a){
    if(a){
        this.setAttribute("contenteditable","true");
    }else{
        this.setAttribute("contenteditable","false");
    }
    return this;
};
Element.prototype.add=function(a){
    this.appendChild(a);
    return this;
};
function AbilityHolder(m){
    var n=function(a){return document.createElement(a);};
    var a=n("table");
    var tr=n("tr");
    var th=n("th");
    this.level_object=n("div").setEdit(1).setText("50").setClass("num");
    th.appendChild(this.level_object);
    tr.appendChild(th);
    tr.appendChild(n("th").setText("种族值"));
    tr.appendChild(n("th").setText("个体值"));
    tr.appendChild(n("th").setText("努力值"));
    tr.appendChild(n("th").setText("实际值"));
    tr.appendChild(n("th").setText("数据"));
    a.appendChild(tr);
    this.base_holder=[];
    this.effort_holder=[];
    this.self_holder=[];
    this.data_holder=[];
    this.statis_holder=[];
    this.doll_holder=m;
    var that=this;
    for(var i=0;i<6;i++){
        tr=n("tr");
        tr.appendChild(n("th").setText(AName[i]));
        tr.appendChild(this.base_holder[i]=n("td").setText("80").setClass("num"));
        tr.appendChild(n("td").add(this.self_holder[i]=n("div").setEdit(1).setText("15").setClass("num")));
        tr.appendChild(n("td").add(this.effort_holder[i]=n("div").setEdit(1).setText("0").setClass("num")));
        tr.appendChild(n("td").add(this.data_holder[i]=n("div").setEdit(1).setText("0").setClass("num")));
        tr.appendChild(n("td").add(this.statis_holder[i]=n("div").setEdit(1).setText("0").setClass("num")));
        a.appendChild(tr);
        if(that.doll_holder) {
            (function () {
                var j = i;
                that.effort_holder[j].oninput = function () {
                    that.doll.efforts[j] = this.innerHTML>>0;
                    var evl=130;
                    for(var q=0;q<6;q++){
                        evl=evl-that.doll.efforts[q];
                    }
                    if(evl<0){that.doll.efforts[j]+=evl;this.innerHTML=""+that.doll.efforts[j];}
                    if(that.doll.efforts[j]>64){
                        that.doll.efforts[j]=64;
                        this.innerHTML=""+that.doll.efforts[j];
                    }
                    that.doll_holder.refreshData();
                };
                that.self_holder[j].oninput = function () {
                    var p=+this.innerHTML;
                    if(p!=p>>0){
                        p=p>>0;
                        this.innerHTML=""+p;
                    }
                    if(p>15){
                        p=15;
                        this.innerHTML=""+p;
                    }
                    if(p<0){
                        p=0;
                        this.innerHTML=""+p;
                    }
                    that.doll.selfs[j] = p;
                    that.doll_holder.refreshData();
                }
            })();
        }
    }
    a.setAttribute("border","1");
    this.main_holder=a;
}

AbilityHolder.prototype.setDoll=function(doll){
    for(var i=0;i<6;i++){
        this.base_holder[i].setText(""+doll.dolldex.base[i]);
        this.self_holder[i].setText(""+doll.selfs[i]);
        this.effort_holder[i].setText(""+doll.efforts[i]);
        this.data_holder[i].setText((doll.yin==i?"+":"")+doll.data[i]);
    }
    this.level_object.setText(""+doll.level);
    this.doll=doll;
    return this;
};


function DollHolder(){
    var div="div";
    var o="o";
    var n=function(a){return document.createElement(a);};
    var m=n(div);
    this.main_holder=m;
    this.name_holder=generateSelector(doll_Dex);
    var t=n(o).setText("人形：");
    var t2=n(div).add(t).add(this.name_holder);
    m.add(t2);
    DollHolder.count++;
    this.data_holder=new AbilityHolder(this);
    m.add(this.data_holder.main_holder);
    var cls=this.name_holder;
    var that=this;
    this.name_holder.onchange=function(){
        console.log(cls.value);
        that.setDollDex(cls.pool[cls.value]);
    };

    this.doll=new Doll();

}
DollHolder.count=0;

DollHolder.full_doll_list=null;

function generateSelector(pool) {
    var n = function (a) {
        return document.createElement(a);
    };
    var l=n("select");
    //DollHolder.full_doll_list=n("datalist");
    for(var i=0;i<pool.length;i++){
        var t=n("option");
        t.setAttribute("value",i+"");
        t.setText(doll_Dex[i].uniquename);
        l.add(t);
    }
    l.pool=pool;
    return l;
}

function generateTypeSelector(pool) {
    var n = function (a) {
        return document.createElement(a);
    };
    var l=n("select");
    //DollHolder.full_doll_list=n("datalist");
    for(var i=0;i<AName.length;i++){
        var t=n("option");
        t.setAttribute("value",i+"");
        t.setText(AName[i]);
        l.add(t);
    }
    l.pool=pool;
    return l;
}


DollHolder.prototype.setDollDex=function(dolldex){
    this.doll.setDollDex(dolldex);
    this.data_holder.setDoll(this.doll);
};

DollHolder.prototype.refreshData=function(){
    this.doll.refreshData();
    this.data_holder.setDoll(this.doll);
};