import { SensenPluginExtended } from "sensen-jutsu/plugin";
export default class SensenPluginStages extends SensenPluginExtended {
    constructor(props) {
        super(props);
        this.$identity = '@sensen-stages';
        this.$stagesElements = {};
        this.$stages = {};
        this.$props = props || {};
    }
    $render() {
        return this.$initializeProps(this.$props).$initializeEmitters().$recolts();
    }
    $initializeEmitters() {
        this.$emitter.listen('contentChange', ({ emit: records, type }) => {
            this.$bewitchment();
        });
        return this;
    }
    $recolts() {
        requestAnimationFrame(() => {
            this.$stagesElements = this.querySelectorAll(`stage-scene`);
            if (this.$stagesElements.length) {
                this.$stagesElements.forEach((stage, range) => {
                    if ('$initializeProps' in stage) {
                        stage.$initializeProps();
                    }
                    if ('$setProp' in stage) {
                        stage.$setProp('range', range);
                    }
                    if (stage.$props?.name) {
                        this.$stages[stage.$props?.name] = stage;
                    }
                });
            }
            this.$run();
        });
        return this;
    }
    $run() {
        if (this.$props?.default) {
            this.$go(this.$props?.default);
        }
        return this;
    }
    $go(name) {
        const bootstrap = this.$stages[name] || undefined;
        if (bootstrap instanceof SensenPluginStage) {
            if (this.$stage instanceof SensenPluginStage) {
                this.$stage.$hide();
            }
            this.$stage = bootstrap;
            bootstrap.$show();
            this.$emitter.dispatch('navigate', this);
        }
        return this;
    }
    $next() {
        if (this.$stage instanceof SensenPluginStage) {
            console.warn('Next Stage', this.$stage);
            this.$emitter.dispatch('next', this);
        }
        return this;
    }
    $previous() {
        if (this.$stage instanceof SensenPluginStage) {
            console.warn('Previous Stage', this.$stage);
            this.$emitter.dispatch('previous', this);
        }
        return this;
    }
    static $use() {
        SensenPluginStage.$use();
        setTimeout(() => {
            if (!customElements.get(this.$name)) {
                customElements.define(this.$name, this);
            }
        }, 100);
        return this;
    }
}
SensenPluginStages.$name = 'plugin-stages';
export class SensenPluginStage extends SensenPluginExtended {
    constructor(props) {
        super(props);
        this.$props = props || {};
        this.$hide();
    }
    $show() {
        this.$setProp('status', 1);
        this.style.removeProperty('display');
        return this;
    }
    $hide() {
        this.$setProp('status', 0);
        this.style.display = 'none';
        return this;
    }
    $render() {
        return this.$initializeProps(this.$props).$initEmitters();
    }
    $initEmitters() {
        return this;
    }
    $next() {
        if ('$plugin' in this) {
            if (this.$plugin instanceof SensenPluginStages) {
                this.$plugin.$next();
            }
        }
        return this;
    }
    $previous() {
        if ('$plugin' in this) {
            if (this.$plugin instanceof SensenPluginStages) {
                this.$plugin.$previous();
            }
        }
        return this;
    }
    $go(name) {
        if ('$plugin' in this) {
            if (this.$plugin instanceof SensenPluginStages) {
                this.$plugin.$go(name);
            }
        }
        return this;
    }
    static $use() {
        if (!customElements.get(this.$name)) {
            customElements.define(this.$name, this);
        }
        return this;
    }
}
SensenPluginStage.$name = 'stage-scene';
