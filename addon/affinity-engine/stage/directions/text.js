import Ember from 'ember';
import { configurable, classNamesConfigurable, deepConfigurable } from 'affinity-engine';
import { Direction, cmd } from 'affinity-engine-stage';
import multiton from 'ember-multiton-service';

const {
  computed,
  merge,
  get,
  set
} = Ember;

export default Direction.extend({
  componentPath: 'affinity-engine-stage-direction-text',
  layer: 'engine.prompt.text',

  config: multiton('affinity-engine/config', 'engineId'),
  fixtureStore: multiton('affinity-engine/fixture-store', 'engineId'),

  _configurationTiers: [
    'attrs',
    'character.attrs.text',
    'character.attrs',
    'character.attrs.fixture.text',
    'character.attrs.fixture',
    'config.attrs.component.stage.direction.text',
    'config.attrs.component.stage',
    'config.attrs'
  ],

  _directableDefinition: computed('_configurationTiers', {
    get() {
      const configurationTiers = get(this, '_configurationTiers');

      return {
        customClassNames: classNamesConfigurable(configurationTiers, 'classNames'),
        cps: configurable(configurationTiers, 'cps'),
        keyboardPriority: configurable(configurationTiers, 'keyboardPriority'),
        keys: configurable(configurationTiers, 'keys.accept'),
        instant: configurable(configurationTiers, 'instant'),
        name: configurable(configurationTiers, 'name'),
        namePosition: configurable(configurationTiers, 'namePosition'),
        scrollable: configurable(configurationTiers, 'scrollable'),
        text: configurable(configurationTiers, 'text'),
        transitionIn: deepConfigurable(configurationTiers, 'transitionIn', 'transition'),
        transitionOut: deepConfigurable(configurationTiers, 'transitionOut'),
        tweenEffect: configurable(configurationTiers, 'lxlTransition.effect'),
        tweenRate: configurable(configurationTiers, 'lxlTransition.rate')
      }
    }
  }),

  _setup: cmd({ async: true, directable: true }, function(text, character) {
    set(this, 'attrs.text', text);
    set(this, 'character', character);
  }),

  classNames: cmd(function(classNames) {
    set(this, 'attrs.classNames', classNames);
  }),

  instant: cmd(function(instant = true) {
    set(this, 'attrs.instant', instant);
  }),

  keyboardPriority: cmd(function(keyboardPriority) {
    set(this, 'attrs.keyboardPriority', keyboardPriority);
  }),

  keys: cmd(function(keys) {
    set(this, 'attrs.keys', { accept: keys });
  }),

  name: cmd(function(name) {
    set(this, 'attrs.name', name);
  }),

  namePosition: cmd(function(namePosition) {
    set(this, 'attrs.namePosition', namePosition);
  }),

  scrollable: cmd(function(scrollable = true) {
    set(this, 'attrs.scrollable', scrollable);
  }),

  textTransition: cmd(function(textTransition) {
    set(this, 'attrs.textTransition', textTransition);
  }),

  textSpeed: cmd(function(textSpeed) {
    set(this, 'attrs.textSpeed', textSpeed);
  }),

  transitionIn: cmd(function(effect, duration, options = {}) {
    set(this, 'attrs.transitionIn', merge({ duration, effect }, options));
  }),

  transitionOut: cmd(function(effect, duration, options = {}) {
    set(this, 'attrs.transitionOut', merge({ duration, effect }, options));
  })
});
