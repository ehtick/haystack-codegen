/*
 * Copyright (c) 2021, J2 Innovations. All Rights Reserved
 */

import { CodeGenerator } from '../src/CodeGenerator'
import { HNamespace } from 'haystack-core'
import { DocCommentNode } from '../src/nodes/DocCommentNode'
import { resolveDefaultNamespace } from '../src/nodes/util'

describe('CodeGenerator', function (): void {
	let namespace: HNamespace

	describe('#generate()', function (): void {
		beforeAll(function (): void {
			jest.spyOn(
				DocCommentNode.prototype,
				'toDateString'
			).mockImplementation(() => 'date')
		})

		beforeAll(async function (): Promise<void> {
			namespace = await resolveDefaultNamespace()
		})

		it('generates a document for a site', function (): void {
			const code = new CodeGenerator(['ahu'], namespace).generate()

			expect(code.trim()).toBe(
				`
/*
 * Automatically generated by haystack-codegen on date.
 */

import {
	HDict,
	HStr,
	HRef,
	HNamespace,
	valueIsKind,
	Kind,
} from 'haystack-core'

/**
 * marker
 */
export interface Marker extends HDict {}

/**
 * entity
 */
export interface Entity extends Marker {
	dis?: HStr
	id?: HRef
}

/**
 * equip
 */
export interface Equip extends Entity {
	equipRef?: HRef
	siteRef?: HRef
	spaceRef?: HRef
}

/**
 * Returns true if a value is a equip
 *
 * An optional namespace can be passed in that will perform the check using defs
 *
 * @param value The value to test
 * @param namespace An optional namespace
 * @returns true if the value matches
 */
export function isEquip(value: unknown, namespace?: HNamespace): value is Equip {
	if (!valueIsKind<HDict>(value, Kind.Dict)) {
		return false
	}
	if (namespace) {
		return !!namespace.reflect(value)?.fits('equip')
	} else {
		return (
			value.has('equip') ||
			value.has('actuator') ||
			value.has('damper-actuator') ||
			value.has('valve-actuator') ||
			value.has('airHandlingEquip') ||
			value.has('ahu') ||
			value.has('doas') ||
			value.has('mau') ||
			value.has('rtu') ||
			value.has('fcu') ||
			value.has('crac') ||
			value.has('unitVent') ||
			value.has('heatPump') ||
			value.has('airTerminalUnit') ||
			value.has('cav') ||
			value.has('vav') ||
			value.has('ates') ||
			value.has('battery') ||
			value.has('boiler') ||
			value.has('hot-water-boiler') ||
			value.has('steam-boiler') ||
			value.has('chiller') ||
			value.has('circuit') ||
			value.has('conduit') ||
			value.has('duct') ||
			value.has('pipe') ||
			value.has('wire') ||
			value.has('coolingTower') ||
			value.has('flowInverter') ||
			value.has('fumeHood') ||
			value.has('heatExchanger') ||
			value.has('coil') ||
			value.has('coolingCoil') ||
			value.has('heatingCoil') ||
			value.has('humidifier-equip') ||
			value.has('luminaire') ||
			value.has('meter') ||
			value.has('elec-meter') ||
			value.has('ac-elec-meter') ||
			value.has('dc-elec-meter') ||
			value.has('flow-meter') ||
			value.has('motor') ||
			value.has('fan-motor') ||
			value.has('pump-motor') ||
			value.has('panel') ||
			value.has('controls-panel') ||
			value.has('elec-panel') ||
			value.has('plant') ||
			value.has('chilled-water-plant') ||
			value.has('hot-water-plant') ||
			value.has('steam-plant') ||
			value.has('rack') ||
			value.has('radiantEquip') ||
			value.has('chilledBeam') ||
			value.has('radiantFloor') ||
			value.has('radiator') ||
			value.has('tank') ||
			value.has('thermostat') ||
			value.has('ups') ||
			value.has('verticalTransport') ||
			value.has('elevator') ||
			value.has('escalator') ||
			value.has('movingWalkway') ||
			value.has('well')
		)
	}
}

/**
 * output
 */
export interface Output extends Marker {}

/**
 * air-output
 */
export interface Air_Output extends Output {}

/**
 * input
 */
export interface Input extends Marker {}

/**
 * elec-input
 */
export interface Elec_Input extends Input {
	elecRef?: HRef
}

/**
 * airHandlingEquip
 */
export interface AirHandlingEquip extends Equip, Air_Output, Elec_Input {}

/**
 * Returns true if a value is a airHandlingEquip
 *
 * An optional namespace can be passed in that will perform the check using defs
 *
 * @param value The value to test
 * @param namespace An optional namespace
 * @returns true if the value matches
 */
export function isAirHandlingEquip(value: unknown, namespace?: HNamespace): value is AirHandlingEquip {
	if (!valueIsKind<HDict>(value, Kind.Dict)) {
		return false
	}
	if (namespace) {
		return !!namespace.reflect(value)?.fits('airHandlingEquip')
	} else {
		return (
			value.has('airHandlingEquip') ||
			value.has('ahu') ||
			value.has('doas') ||
			value.has('mau') ||
			value.has('rtu') ||
			value.has('fcu') ||
			value.has('crac') ||
			value.has('unitVent') ||
			value.has('heatPump')
		)
	}
}

/**
 * ahu
 */
export interface Ahu extends AirHandlingEquip {}

/**
 * Returns true if a value is a ahu
 *
 * An optional namespace can be passed in that will perform the check using defs
 *
 * @param value The value to test
 * @param namespace An optional namespace
 * @returns true if the value matches
 */
export function isAhu(value: unknown, namespace?: HNamespace): value is Ahu {
	if (!valueIsKind<HDict>(value, Kind.Dict)) {
		return false
	}
	if (namespace) {
		return !!namespace.reflect(value)?.fits('ahu')
	} else {
		return (
			value.has('ahu') ||
			value.has('doas') ||
			value.has('mau') ||
			value.has('rtu')
		)
	}
}
`.trim()
			)
		})
	})
})
