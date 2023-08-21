import {AnimatedOnScroll} from "react-animated-css-onscroll";

const Page = (props) => {
const {children,...rest} =props;
return (
<div {...rest} className="page">
	{children}
	</div>
)
}

function Apps() {
return (
	<div className="App">
	<h1 align="center">Hey! Geek Welcome</h1>
	<h2 align="center">Let's see some effects</h2>
	<div id="start">
	<AnimatedOnScroll animationIn="fadeInDownBig">
	<Page children="fadeInDownBig"/>
	</AnimatedOnScroll>
	<AnimatedOnScroll animationIn="bounceInLeft">
	<Page children="bounceInLeft"/>
	</AnimatedOnScroll>
	<AnimatedOnScroll animationIn="wobble">
	<Page children="wobble"/>
	</AnimatedOnScroll>
	<AnimatedOnScroll animationIn="tada">
	<Page children="tada"/>
	</AnimatedOnScroll>
	<AnimatedOnScroll animationIn="jello">
	<Page children="jello"/>
	</AnimatedOnScroll>
	<AnimatedOnScroll animationIn="bounceInRight">
	<Page children="bounceInRight"/>
	</AnimatedOnScroll>
	<AnimatedOnScroll animationIn="bounce" duration="1000">
	<Page children="bounce"/>
	</AnimatedOnScroll>
	</div>
	</div>
);
}

export default Apps;
