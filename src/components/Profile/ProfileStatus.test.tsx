import React from "react";
import {create} from "react-test-renderer";
import {ProfileStatus} from "./ProfileStatus";

describe('ProfileStatus Component', () => {
    test('status should be in state', () => {
        const component = create(<ProfileStatus status='test-status' updateStatus={() => {
        }}/>);
        const instance = component.getInstance();
        // @ts-ignore
        expect(instance.state.status).toBe('test-status');
    })
    test('after start should be <span>', () => {
        const component = create(<ProfileStatus status='test-status' updateStatus={() => {
        }}/>);
        const root = component.root;
        let span=root.findByType('span')
        expect(span).not.toBeNull();
    })
    test('after start should not be <input>', () => {
        const component = create(<ProfileStatus status='test-status' updateStatus={() => {
        }}/>);
        const root = component.root;
        expect(()=>{
            let input=root.findByType('input')
        }).toThrow();
    })
    test('after start should be correct <span>', () => {
        const component = create(<ProfileStatus status='test-status' updateStatus={() => {
        }}/>);
        const root = component.root;
        let div=root.findByType('div')
        expect(div.children[0]).toBe('status');
    })
    test(' should be displayed <input>', () => {
        const component = create(<ProfileStatus status='test-status' updateStatus={() => {
        }}/>);
        const root = component.root;
        let div=root.findByType('div')
        div.props.onDoubleClick();
        let input=root.findByType('input')
        expect(input.props.value).toBe('test-status');
    })
})
