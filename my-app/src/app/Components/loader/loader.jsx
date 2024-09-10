import './loader.css';

export default function LoaderComponent() {
    return (
        <div className="loader-container">
            <div className="loader-content">
                <svg className='loader-svg' viewBox="0 0 1320 300">
                    <text className='loader-text' x="50%" y="50%" dy=".35em" textAnchor="middle">
                        KLU SAC
                    </text>
                </svg>
            </div>
        </div>
    );
}
