import { Directive, ElementRef, HostListener, Input, OnDestroy } from "@angular/core";
import { Placement } from "./types/placement.type";

type ContainerPosition = {
    left: number;
    top: number;
}

@Directive({
    selector: '[tooltip]'
})
export class TooltipDirective implements OnDestroy {
    @Input()
    tooltip = '';

    @Input()
    delay?: number;

    @Input()
    duration?: number;

    @Input()
    placement: Placement = 'bottom';

    @Input()
    withCondition: boolean = true;

    private tooltipRef?: HTMLDivElement;
    private timerId?: any;
    private defaultSpacing: number = 6;

    constructor(private el: ElementRef) { }

    ngOnDestroy(): void {
        this.tooltipRef?.remove();
    }

    @HostListener('focusin')
    @HostListener('mouseenter')
    onMouseEnter() {
        if(!this.withCondition)
            return;
            
        const position = this.getContainerPosition(this.placement);

        if (this.delay)
            this.timerId = setTimeout(() => this.createTooltipContainer(position), this.delay);
        else
            this.createTooltipContainer(position);
    }

    @HostListener('focusout')
    @HostListener('mouseleave')
    onMouseLeave() {
        if (this.timerId)
            clearTimeout(this.timerId);

        this.tooltipRef?.remove();
        this.tooltipRef = undefined;
    }

    private getContainerPosition(placement: Placement): ContainerPosition {
        const element = this.el.nativeElement;
        const rect = element.getBoundingClientRect();

        if (placement == 'top')
            return {
                left: rect.left + element.offsetWidth / 2,
                top: rect.top - (element.offsetHeight + this.defaultSpacing)
            };

        return {
            left: rect.left + element.offsetWidth / 2,
            top: rect.top + element.offsetHeight + this.defaultSpacing
        };
    }

    private createTooltipContainer(position: ContainerPosition) {
        let tooltip = document.createElement('div');

        tooltip.innerHTML = this.tooltip;

        tooltip.setAttribute('class', 'tooltip-container');
        tooltip.style.top = `${position.top}px`;
        tooltip.style.left = `${position.left}px`;

        document.body.appendChild(tooltip);

        this.tooltipRef = tooltip;

        if (this.duration)
            setTimeout(() => this.tooltipRef?.remove(), this.duration);
    }
}