import Ember from 'ember';
import layout from '../templates/components/affinity-engine-stage-direction-text';
import { registrant } from 'affinity-engine';
import { DirectableComponentMixin, StyleableComponentMixin } from 'affinity-engine-stage';
import multiton from 'ember-multiton-service';

const {
  Component,
  computed,
  get,
  isPresent,
  set
} = Ember;

const { alias } = computed;

export default Component.extend(DirectableComponentMixin, StyleableComponentMixin, {
  layout,

  classNames: ['ae-stage-direction-text-container'],
  hook: 'affinity_engine_stage_direction_text',

  config: multiton('affinity-engine/config', 'engineId'),
  translator: registrant('affinity-engine/translator'),

  character: alias('directable.attrs.character'),
  keyboardActivated: alias('isFocused'),

  customClassNames: alias('directable.customClassNames'),
  cps: alias('directable.cps'),
  keyboardPriority: alias('directable.keyboardPriority'),
  keys: alias('directable.keys'),
  instant: alias('directable.instant'),
  name: alias('directable.name'),
  namePosition: alias('directable.namePosition'),
  scrollable: alias('directable.scrollable'),
  transitionIn: alias('directable.transitionIn'),
  transitionOut: alias('directable.transitionOut'),
  text: alias('directable.text'),
  tweenEffect: alias('directable.tweenEffect'),
  tweenRate: alias('directable.tweenRate'),
  tweenLibrary: alias('config.attrs.affinity-engine.animator.name'),

  didInsertElement(...args) {
    this._super(...args);

    this._handlePriorSceneRecord();
  },

  _handlePriorSceneRecord() {
    if (isPresent(get(this, 'priorSceneRecord'))) {
      this.resolveAndDestroy();
    }
  },

  nameTranslation: computed('name', {
    get() {
      const name = get(this, 'name.key') || get(this, 'name');
      const options = get(this, 'name.options');

      return get(this, 'translator').translate(name, options) || name;
    }
  }).readOnly(),

  textTranslation: computed('text', {
    get() {
      const text = get(this, 'text.key') || get(this, 'text');
      const options = get(this, 'text.options');

      return get(this, 'translator').translate(text, options) || text;
    }
  }).readOnly(),

  actions: {
    completeText() {
      if (get(this, 'willResolveExternally')) { return; }

      set(this, 'willTransitionOut', true);
    },

    didTransitionOut() {
      this.resolveAndDestroy();
    }
  }
});
