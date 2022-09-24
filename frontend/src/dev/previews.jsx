import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import MainPage from "../pages/MainPage";
import ToastNotify from "../components/UI/ToastNotify/ToastNotify";
import Button from "../components/UI/button/Button";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/MainPage">
                <MainPage/>
            </ComponentPreview>
            <ComponentPreview path="/ToastNotify">
                <ToastNotify/>
            </ComponentPreview>
            <ComponentPreview path="/Button">
                <Button/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;