import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router";

const New_arival = () => {
	const scrollRef = useRef(null);
	const [isDragging, setDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(false);
	const [canscrollright, setCanscrollright] = useState(true);
	const [canscrollleft, setCanscrollleft] = useState(false);

	const newArivals = [
		{
			_id: 1,
			name: "Stylish jacket",
			price: 0,
			images: [
				{
					url: "https://picsum.photos/500/500?/random?image=1",
					altText: "Stylish jacket",
				},
			],
		},
		{
			_id: 2,
			name: "Stylish jacket",
			price: 160,
			images: [
				{
					url: "https://picsum.photos/500/500?/random?image=2",
					altText: "Stylish jacket",
				},
			],
		},
		{
			_id: 3,
			name: "Stylish jacket",
			price: 660,
			images: [
				{
					url: "https://picsum.photos/500/500?/random?image=3",
					altText: "Stylish jacket",
				},
			],
		},
		{
			_id: 4,
			name: "Stylish jacket",
			price: 460,
			images: [
				{
					url: "https://picsum.photos/500/500?/random?image=4",
					altText: "Stylish jacket",
				},
			],
		},
		{
			_id: 5,
			name: "Stylish jacket",
			price: 4560,
			images: [
				{
					url: "https://picsum.photos/500/500?/random?image=5",
					altText: "Stylish jacket",
				},
			],
		},
		{
			_id: 6,
			name: "Stylish jacket",
			price: 5860,
			images: [
				{
					url: "https://picsum.photos/500/500?/random?image=6",
					altText: "Stylish jacket",
				},
			],
		},
	];
	const handlemouseDown = (e) => {
		setDragging(true);
		setStartX(e.pageX - scrollRef.current.offsetLeft);
		setScrollLeft(scrollRef.current.scrollLeft);
	};
	const handleMouseMove = (e) => {
		if (!isDragging) return;
		e.preventDefault();
		const x = e.pageX - scrollRef.current.offsetLeft;
		const walk = x - startX; //scroll-fast
		scrollRef.current.scrollLeft = scrollLeft - walk;
	};
	const handleMouseUporLeave = () => {
		setDragging(false);
	};

	const scroll = (direction) => {
		const scrollamount = direction === "left" ? -300 : 300;
		scrollRef.current.scrollBy({ left: scrollamount, behavior: "smooth" });
	};
	const UpdateScrollButton = () => {
		const container = scrollRef.current;
		if (container) {
			const leftscroll = container.scrollLeft;
			const rightscrollable =
				container.scrollLeft + container.clientWidth <
				container.scrollWidth;

			setCanscrollleft(leftscroll > 0);
			setCanscrollright(rightscrollable);
		}
	};
	useEffect(() => {
		const container = scrollRef.current;
		if (container) {
			container.addEventListener("scroll", UpdateScrollButton);
			UpdateScrollButton();
			return () =>
				container.removeEventListener("scroll", UpdateScrollButton);
		}
	}, []);
	useEffect(() => {
		const container = scrollRef.current;
		if (!container) return;
	
		const handleWheelScroll = (event) => {
			if (event.deltaY === 0) return; // Ignore horizontal scrolling
			event.preventDefault();
			container.scrollBy({
				left: event.deltaY * 1, // Keep it 1x to match trackpad feel
				behavior: "smooth",
			});
		};
	
		container.addEventListener("wheel", handleWheelScroll, { passive: false });
	
		return () => {
			container.removeEventListener("wheel", handleWheelScroll);
		};
	}, []);
	

	return (
		<section className="py-16 px-4 lg:px-0">
			<div className="container mx-auto text-center mb-10 relative  ">
				<h2 className="text-3xl font-bold mb-4  ">
					Explore New Arivals{" "}
				</h2>
				<p className="text-lg text-gray-600 mb-8">
					Discover the latest style straight off the Runway , freshly
					added to keep your wardrobe on the cutting edge of fashion.
				</p>
				<div className="absolute right-0 bottom-[-30px] flex space-x-2  ">
					<button
						onClick={() => scroll("left")}
						disabled={!canscrollleft}
						className={`p-2 rounded border  border-gray-200 bg-white text-black ${
							canscrollleft
								? "bg-white text-black"
								: "bg-gray-200 text-gray-400 cursor-not-allowed"
						}`}
					>
						<FiChevronLeft className="text-2xl" />
					</button>
					<button
						onClick={() => scroll("right")}
						disabled={!canscrollright}
						className={`p-2 rounded border  border-gray-200 bg-white text-black ${
							canscrollright
								? "bg-white text-black"
								: "bg-gray-200 text-gray-400 cursor-not-allowed"
						}`}
					>
						<FiChevronRight className="text-2xl" />
					</button>
				</div>
			</div>
			<div
				ref={scrollRef}
				className={`container mx-auto overflow-x-scroll  flex space-x-6 relative scrollbar-hide ${
					isDragging ? "cursor-grabbing" : "cursor-grab"
				}  `}
				onMouseDown={handlemouseDown}
				onMouseUp={handleMouseUporLeave}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseUporLeave}
			>
				{newArivals.map((product) => (
					<div
						key={product._id}
						className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative "
					>
						<img
							src={product.images[0]?.url}
							alt={product.images[0].altText || product.name}
							className="w-full h-[400px] object-cover rounded-lg"
							draggable="false"
						/>
						<div className="absolute bottom-0 left-0 right-0 backdrop-blur-md text-white p-4 rounded-b-lg ">
							<Link
								to={`/product/${product._id}`}
								className="block"
							>
								<h4 className="font-medium">{product.name}</h4>
								<p className="mt-1">${product.price}</p>
							</Link>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default New_arival;
