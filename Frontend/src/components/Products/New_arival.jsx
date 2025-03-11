import { useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router";

const New_arival = () => {
	const scrollRef = useRef(null);
	// const [isDraging, setDragging] = useState(false);
	// const [startX, setStartX] = useState(false);
	// const [scrollLeft, setScrollLeft] = useState(false);
	// const [canscrollright, setCanscrollright] = useState(true);

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
			price: 0,
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
			price: 0,
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
			price: 0,
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
			price: 0,
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
			price: 0,
			images: [
				{
					url: "https://picsum.photos/500/500?/random?image=6",
					altText: "Stylish jacket",
				},
			],
		},
	];
    const UpdateScrollButton = () => {
        const container = scrollRef.current;
        console.log({
            scrollLeft: container.scrollLeft,
            clientWidth: container.clientWidth,
            scrollWidth: container.scrollWidth,
        });
        
    }
    useEffect(() => {
        const conatiner = scrollRef.current;
        if(conatiner){
            conatiner.addEventListener("scroll",UpdateScrollButton);
            UpdateScrollButton()
        }
    })
	return (
		<section>
			<div className="container mx-auto text-center mb-10 relative  ">
				<h2 className="text-3xl font-bold mb-4  ">
					Explore New Arivals{" "}
				</h2>
				<p className="text-lg text-gray-600 mb-8">
					Discover the latest style straight off the Runway , freshly
					added to keep your wardrobe on the cutting edge of fashion.
				</p>
				<div className="absolute right-0 bottom-[-30px] flex space-x-2  ">
					<button className="p-2 rounded border  border-gray-200 bg-white text-black ">
						<FiChevronLeft className="text-2xl" />
					</button>
					<button className="p-2 rounded border border-gray-200 bg-white text-black ">
						<FiChevronRight className="text-2xl" />
					</button>
				</div>
			</div>
			<div
				ref={scrollRef}
				className="container mx-auto overflow-x-scroll flex space-x-6 relative "
			>
				{newArivals.map((product) => (
					<div
						key={product._id}
						className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative "
					>
						<img
							src={product.images[0]?.url}
							alt={product.images[0].altText || product.name}
							className="w-full h-[500px] object-cover rounded-lg"
						/>
						<div className="absolute bottom-0 left-0 right-0 backdrop-blur-md text-white p-4 rounded-b-lg ">
							<Link
								to={"/product/${product._id}"}
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
