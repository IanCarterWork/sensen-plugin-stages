import { SensenEmitter } from "sensen-jutsu/emitter";

import { SensenPluginExtended } from "sensen-jutsu/plugin"




export type SensenPluginStagesStore = {

    [iD : string] : SensenPluginStage
    
}


export type SensenPluginStagesElements = NodeListOf<SensenPluginStage>



export type SensenPluginStagesProps = SensenPluginExtendedProps & {

    default: string;
    
}

export type SensenPluginStagesProp = SensenPluginExtendedProps & {

    name: string;

    range?: number;
    
}




export default class SensenPluginStages extends SensenPluginExtended<SensenPluginStagesProps>{


    static $name = 'plugin-stages'

    $identity: string = '@sensen-stages'

    $stagesElements : SensenPluginStagesElements = {} as SensenPluginStagesElements;

    $stages : SensenPluginStagesStore =  {} as SensenPluginStagesStore

    $stage? : SensenPluginStage;



    constructor(props?: SensenPluginStagesProps){

        super(props);

        this.$props = props || {} as SensenPluginStagesProps


    }


    $render(){

        return this.$initializeProps(this.$props).$initializeEmitters().$recolts();

    }


    $initializeEmitters(){

        this.$emitter.listen<MutationRecord[]>('contentChange', ({emit:records, type})=>{

            this.$bewitchment();
            
        })

        return this;
        
    }
    

    $recolts(){

        requestAnimationFrame(()=>{

            this.$stagesElements = this.querySelectorAll<SensenPluginStage>(`stage-scene`);
    
    
            if(this.$stagesElements.length){
    
                this.$stagesElements.forEach((stage, range)=>{
    
                    if('$initializeProps' in stage){ stage.$initializeProps(); }

                    if('$setProp' in stage){ stage.$setProp<'range'>('range', range); }
    
                    if(stage.$props?.name){
    
                        this.$stages[stage.$props?.name] = stage
    
                    }

                    
                    
                })
                
            }
    
            this.$run()

        })

        return this;
        
    }
    



    $run(){

        if(this.$props?.default){

            this.$go( this.$props?.default );

        }

        return this;
        
    }




    $go(name: string){

        const bootstrap = this.$stages[ name ] || undefined

        if(bootstrap instanceof SensenPluginStage){

            if(this.$stage instanceof SensenPluginStage){

                this.$stage.$hide();
                
            }
            
            this.$stage = bootstrap;

            bootstrap.$show();

            this.$emitter.dispatch('navigate', this)
    
        }


        return this;

    }
    


    $next(){

        if(this.$stage instanceof SensenPluginStage){

            console.warn('Next Stage', this.$stage )
            
            this.$emitter.dispatch('next', this)
        }

        return this;
        
    }
    


    $previous(){

        if(this.$stage instanceof SensenPluginStage){

            console.warn('Previous Stage', this.$stage )
            
            this.$emitter.dispatch('previous', this)
        }

        return this;
        
    }



    static $use(){

        SensenPluginStage.$use()

        setTimeout(()=>{

            if(!customElements.get(this.$name)){

                customElements.define(this.$name, this)
                
            }
    
        }, 100)

        return this;
        
    }
    
    
    
}






export class SensenPluginStage extends SensenPluginExtended<SensenPluginStagesProp>{


    static $name = 'stage-scene'
    

    constructor(props?: SensenPluginStagesProp){

        super(props);

        this.$props = props || {} as SensenPluginStagesProp;

        this.$hide();

    }
    


    $show(){

        this.$setProp<'status'>('status', 1)

        this.style.removeProperty('display')
        
        return this;
        
    }

    $hide(){

        this.$setProp<'status'>('status', 0)

        this.style.display = 'none'
        
        return this;
        
    }


    $render(){

        return this.$initializeProps(this.$props).$initEmitters();

    }



    $initEmitters(){


        return this;
        
    }
    


    $next(){

        if('$plugin' in this){

            if(this.$plugin instanceof SensenPluginStages){

                this.$plugin.$next()
                
            }
            
        }

        return this;
        
    }
    


    $previous(){

        if('$plugin' in this){

            if(this.$plugin instanceof SensenPluginStages){

                this.$plugin.$previous()
                
            }
            
        }

        return this;
        
    }
    


    $go(name: string){

        if('$plugin' in this){

            if(this.$plugin instanceof SensenPluginStages){

                this.$plugin.$go(name)
                
            }
            
        }

        return this;
        
    }



    static $use(){

        if(!customElements.get(this.$name)){

            customElements.define(this.$name, this)
            
        }

        return this;
        
    }
    
    
    
}




