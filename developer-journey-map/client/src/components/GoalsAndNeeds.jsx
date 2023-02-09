import React from "react";

const GoalsAndNeeds = () => {
	return (
        <div className="flex h-fit text-center">
            <div className="w-32 bg-slate-700 text-slate-100 p-1 text-sm">GOALS / NEEDS</div>
            <div className="w-60 bg-slate-100 p-1 text-xs">Is this of use to me?</div>
            <div className="w-60 bg-slate-100 p-1 text-xs">Will it meet my needs?</div>
            <div className="w-60 bg-slate-100 p-1 text-xs">How does it work?</div>
            <div className="w-60 bg-slate-100 p-1 text-xs">Can I build a proof of concept?</div>
            <div className="w-60 bg-slate-100 p-1 text-xs">Can I build to scale?</div>
        </div>
    )
};

export default GoalsAndNeeds;
