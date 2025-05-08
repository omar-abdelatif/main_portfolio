interface ProjectFilterProps {
	onFilterChange: (filter: string) => void;
	activeFilter: string;
}

export default function ProjectFilter({ onFilterChange, activeFilter }: ProjectFilterProps) {
	const filters = ['All', 'web', 'mobile', 'desktop'];

	return (
		<div className="w-full max-w-xl mx-auto mb-8">
			<div className="relative">
				<div className="flex justify-between items-center rounded-full bg-gradient-to-r from-[#E5A137] to-[#8B6B3D] p-[2px]">
					<div className="w-full flex justify-between bg-[#E5A137] rounded-full">
						{filters.map((filter) => (
							<button  key={filter}  onClick={() => onFilterChange(filter)} className={`flex-1 py-3 px-6 text-lg font-bold transition-all duration-300 rounded-full  ${activeFilter === filter ? 'bg-[#F7D990] text-[#8B6B3D]' : 'text-[#4A3A1F] hover:bg-[#F7D990]/50'}`}>{filter === 'web' ? 'Web' : filter === 'mobile' ? 'Mobile' : filter === 'desktop' ? 'Desktop' : filter} </button>
						))}
					</div>
				</div>
				<div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8B6B3D] to-[#E5A137] -z-10 blur-sm opacity-50" />
			</div>
		</div>
	);
}
