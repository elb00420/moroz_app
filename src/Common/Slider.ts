import { TGood } from '../Abstract/Types';
import { Component } from '../Abstract/Component';
import { LogicService } from '../Services/LogicService';

export class Slider extends Component {
	private nameGood: string = '';
	private photos: string[] = [];

	private imgLeft: Component;
	private imgCenter: Component;
	private imgRight: Component;
	private divsSlider: Component;
	private btnLeft: Component;
	private btnRight: Component;

	constructor(parent: HTMLElement, private service: LogicService) {
		super(parent, 'div', ['slider__wrapper']);

		this.divsSlider = new Component(this.root, 'div', ['slider']);
		const divPhotoLeft = new Component(this.divsSlider.root, 'div', [
			'left__slider',
		]);
		this.imgLeft = new Component(
			divPhotoLeft.root,
			'img',
			[],
			null,
			['src', 'alt'],
			[this.photos[0], this.nameGood]
		);

		const divPhotoCenter = new Component(this.divsSlider.root, 'div', [
			'center_slider',
		]);
		this.imgCenter = new Component(
			divPhotoCenter.root,
			'img',
			[],
			null,
			['src', 'alt'],
			[this.photos[0], this.nameGood]
		);

		const divPhotoRight = new Component(this.divsSlider.root, 'div', [
			'right_slider',
		]);
		this.imgRight = new Component(
			divPhotoRight.root,
			'img',
			[],
			null,
			['src', 'alt'],
			[this.photos[0], this.nameGood]
		);

		const divButtons = new Component(this.root, 'div', ['slider__buttons']);

		this.btnLeft = new Component(
			divButtons.root,
			'button',
			['left_button__slider', 'button__slider'],
			'<<'
		);
		this.btnLeft.root.onclick = () => {
			this.moveLeftSlider();
		};

		this.btnRight = new Component(
			divButtons.root,
			'button',
			['right_button__slider', 'button__slider'],
			'>>'
		);
		this.btnRight.root.onclick = () => {
			this.moveRightSlider();
		};

		this.divsSlider.root.onanimationend = () => {
			(this.imgCenter.root as HTMLImageElement).src = this.photos[0];
			this.divsSlider.root.classList.remove(
				'move_right__slider',
				'move_left__slider'
			);
			this.btnLeft.root.onclick = () => {
				this.moveLeftSlider();
			};
			this.btnRight.root.onclick = () => {
				this.moveRightSlider();
			};
		};
	}

	public setPhoto(good: TGood): void {
		this.nameGood = good.title;
		const arrPhotos = [];
		if (good.photoLink.length > 0) arrPhotos.push(good.photoLink);
		arrPhotos.push(...good.slider);
		this.photos = arrPhotos;
		[this.imgLeft, this.imgCenter, this.imgRight].forEach((img) => {
			(img.root as HTMLImageElement).src = this.photos[0];
			(img.root as HTMLImageElement).alt = this.nameGood;
		});
	}
	private moveRightSlider(): void {
		if (this.photos.length < 2) return;
		this.btnLeft.root.onclick = null;
		this.btnRight.root.onclick = null;
		this.shiftPhoto('left');
		(this.imgRight.root as HTMLImageElement).src = this.photos[0];
		this.divsSlider.root.classList.add('move_right__slider');
	}

	private moveLeftSlider(): void {
		if (this.photos.length < 2) return;
		this.btnLeft.root.onclick = null;
		this.btnRight.root.onclick = null;
		this.shiftPhoto('right');
		(this.imgLeft.root as HTMLImageElement).src = this.photos[0];
		this.divsSlider.root.classList.add('move_left__slider');
	}

	private shiftPhoto(direction: string): void {
		if (direction === 'left') {
			this.photos = this.photos.slice(1).concat(this.photos.slice(0, 1));
		} else {
			this.photos = this.photos.slice(-1).concat(this.photos.slice(0, -1));
		}
	}
}
