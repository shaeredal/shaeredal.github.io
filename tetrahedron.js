let tetrahedronParts = [];

const registerTetrahedronParts = (elements) => {
    tetrahedronParts = elements;
};

const setDisassemble = () => {
    tetrahedronParts.forEach((part) => {
        part.classList.add('disassemble');
    });
};

const setAssemble = () => {
    tetrahedronParts.forEach((part) => {
        part.classList.remove('disassemble');
    });
};

const registerTriggerHoverElements = (elements) => {
    elements.forEach((el) => {
        el.addEventListener('mouseover', (event) => {
            setDisassemble();
            return event;
        });

        el.addEventListener('mouseout', (event) => {
            setAssemble();
            return event;
        });
    });
};

export {
    registerTetrahedronParts,
    registerTriggerHoverElements,
};