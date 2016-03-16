/**
 * Created by Exbo on 2016/2/13.
 */

function Doll(){
    this.name="";
    this.dolldex=null;
    this.types=[];
    this.status=[];
    this.level=50;
    this.moves=[];
    this.efforts=[];
    this.selfs=[];
    this.data=[];
    this.yin=0;
    this.item=[];
    this.special_chosen=0;
    this.special=null;
    this.scripts={};
}

Doll.REFRESH_DATA=1;

Doll.prototype.setDollDex=function(dolldex){
    this.dolldex=dolldex;
    this.name=this.dolldex.cname;
    this.init();
    this.refreshData();
    return this;
};

Doll.prototype.init=function(){
    this.status=[];
    this.moves=[];
    this.selfs=[15,15,15,15,15,15];
    this.efforts=[0,0,0,0,0,0];
    this.yin=1;
    this.types[0]=this.dolldex.types[0];
    if(this.dolldex.types[1])this.types[1]=this.dolldex.types[1];
    if(!this.dolldex.specials[this.special_chosen]){
        this.special_chosen=0;
    }
    this.special=this.dolldex.specials[this.special_chosen];
};

Doll.prototype.refreshData=function(){
    var d=this.data;
    var b=this.dolldex.base;
    var c=this.selfs;
    var a=this.efforts;
    var l=this.level;
    d[0]=(10+(100+b[0]*2+c[0]*2+a[0])*l/100)>>0;
    for(var i=1;i<6;i++){
        d[i]=(5+(b[i]*2+c[i]*2+a[i])*l/100)>>0;
    }
    if(this.yin){
        d[this.yin]=(d[this.yin]*1.1)>>0;
    }

    for(var j in this.scripts){
        this.scripts[j](Doll.REFRESH_DATA);
    }
    return this;
};


function Move(){
    this.type=0;
    this.name="";
    this.tname="";
    this.var=0;
    this.power=50;
    this.accuracy=100;
    this.sp=30;
    this.disc="null";
    this.special=null;
    this.c_sp=30;
    this.scripts={};
    this.script=null;
}

function DollDexItem(a){
    this.id=a[0]>>0;
    this.name=a[1];
    this.cname=DCName[this.id]||"";
    this.class=a[2]>>0;
    this.classname=a[3];
    this.types=[a[4]>>0];
    if(a[6]>>0)this.types.push(a[6]>>0);
    this.specials=[a[8]>>0];
    if(a[10]>>0)this.specials.push(a[10]>>0);
    this.base=[a[12]>>0,a[13]>>0,a[14]>>0,a[15]>>0,a[16]>>0,a[17]>>0];
    this.uniquename="("+this.id+")"+this.classname[0]+this.cname+"("+this.name+")";
    this.moves=[];
}

var typeDexHit=[];
var typeDexHitBy=[];
var typeNum=18;

function TypeDexName(name,color){
    this.name=name;
    this.color=color;
}

function TypeHit(){
    for(var i=0;i<typeNum;i++){
        this[i]=1;
    }
    this.base=[0];
}
TypeHit.prototype.setBaseTypes=function(types){
    this.base=[];
    for(var i=0;i<types.length;i++) {
        this.base[i] = types[i];
    }
    return this;
};
TypeHit.prototype.hit=function(){
    for(var i=0;i<typeNum;i++){
        this[i]=0;
    }
    for(i=0;i<this.base.length;i++) {
        this.max(typeDexHit[this.base[i]])
    }
    return this;
};
TypeHit.prototype.hitby=function(){
    for(var i=0;i<typeNum;i++){
        this[i]=1;
    }
    for(i=0;i<this.base.length;i++) {
        this.mul(typeDexHitBy[this.base[i]])
    }
    return this;
};


TypeHit.prototype.mul=function(t){
    for(var i=0;i<typeNum;i++){
        this[i]*=t[i];
    }
    return this;
};
TypeHit.prototype.max=function(t){
    for(var i=0;i<typeNum;i++){
        this[i]=t[i]>this[i]?t[i]:this[i];
    }
    return this;
};

function Special(){
    this.name="";
    this.tname="";
    this.script=null;
}

function Battle(){
    this.sides=[];
    this.weather=null;
    this.ground=null;
    this.sidebuffs=[];
}

