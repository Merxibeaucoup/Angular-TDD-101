import { ElementRef } from '@angular/core';
import { ResizableSectionDirective } from './resize-section.directive';

describe('ResizeSectionDirective', () => {
  let directive: ResizableSectionDirective;
  let mockTopElement: HTMLElement;
  let mockBottomElement: HTMLElement;

  beforeEach(() => {
    directive = new ResizableSectionDirective({} as ElementRef);
    mockTopElement = document.createElement('div');
    mockBottomElement = document.createElement('div');

    // Create an instance of the directive with mock elements
    directive = new ResizableSectionDirective({} as ElementRef);
    directive.topElement = mockTopElement;
    directive.bottomElement = mockBottomElement;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should update height property on window resize', () => {
    // Mock window object
    const mockWindow = {
      outerHeight: 600,
    };

    // Mock resize event
    const mockEvent = new CustomEvent('resize', {
      detail: { target: mockWindow },
    });

    // Trigger onResize method with mock event
    directive.onResize(mockEvent);

    // Assert that height property is updated correctly
    expect(directive.height).toBe(600);
  });

  it('should set grabber to true and change cursor style on mousedown', () => {
    // Mock document.body.style.cursor setter
    const mockCursorSetter = jest.fn();
    Object.defineProperty(document.body.style, 'cursor', {
      set: mockCursorSetter,
    });

    // Call the onMouseDown method
    directive.onMouseDown();

    // Assert that grabber is set to true
    expect(directive.grabber).toBe(true);

    // Assert that document.body.style.cursor is set to 'row-resize'
    expect(mockCursorSetter).toHaveBeenCalledWith('row-resize');
  });

  it('should set grabber to false and change cursor style on mouseup', () => {
    // Mock document.body.style.cursor setter
    const mockCursorSetter = jest.fn();
    Object.defineProperty(document.body.style, 'cursor', {
      set: mockCursorSetter,
    });

    // Set grabber to true to simulate the mouse being down
    directive.grabber = true;

    // Call the onMouseUp method
    directive.onMouseUp();

    // Assert that grabber is set to false
    expect(directive.grabber).toBe(false);

    // Assert that document.body.style.cursor is set to 'default'
    expect(mockCursorSetter).toHaveBeenCalledWith('default');
  });

  it('should resize elements on mousemove', () => {
    // Set grabber to true to simulate the mouse being down
    directive.grabber = true;

    // Create mock mouse event
    const mockEvent = {
      preventDefault: jest.fn(),
      clientY: 200, // Simulate movement downward
    } as unknown as MouseEvent;

    // Call the onMouseMove method with mock event
    directive.onMouseMove(mockEvent);

    // Assert that preventDefault was called
    expect(mockEvent.preventDefault).toHaveBeenCalled();

    // Assert that styles were updated correctly for downward movement
    expect(mockTopElement.style.flex).toBe('1 5 184px'); // Adjust value according to test scenario
    expect(mockBottomElement.style.flex).toBe('0 5 516px'); // Adjust value according to test scenario
  });
});
