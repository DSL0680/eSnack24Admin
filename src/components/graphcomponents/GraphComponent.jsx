import { useEffect, useState } from 'react';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { getUserAllergyCount, getUserAgeCount, getUserCountryCount } from '../../api/graphapi/graphAPI.js';


Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// 동적으로 색상을 생성하는 함수
const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        colors.push(`rgba(${r},${g},${b},0.6)`);
    }
    return colors;
};

function GraphComponent() {
    const [countryData, setCountryData] = useState(null);
    const [ageData, setAgeData] = useState(null);
    const [allergyData, setAllergyData] = useState(null);

    useEffect(() => {
        getUserCountryCount().then(data => {
            const labels = Object.keys(data);
            const values = Object.values(data);
            const colors = generateColors(labels.length);
            setCountryData({
                labels,
                datasets: [
                    {
                        label: '사용자 국가별 차트',
                        data: values,
                        backgroundColor: colors,
                    },
                ],
            });
        });

        getUserAgeCount().then(data => {
            const labels = Object.keys(data);
            const values = Object.values(data);
            const colors = generateColors(labels.length);
            setAgeData({
                labels,
                datasets: [
                    {
                        label: '사용자 연령대 차트',
                        data: values,
                        backgroundColor: colors,
                    },
                ],
            });
        });

        getUserAllergyCount().then(data => {
            const labels = Object.keys(data);
            const values = Object.values(data);
            const colors = generateColors(labels.length);
            setAllergyData({
                labels,
                datasets: [
                    {
                        label: '알러지 차트',
                        data: values,
                        backgroundColor: colors,
                    },
                ],
            });
        });
    }, []);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">데이터 시각화</h1>

                <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">사용자 국가별 차트</h2>
                    <div className="h-96">
                        {countryData && <Bar data={countryData} options={chartOptions} />}
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">사용자 연령대 차트</h2>
                    <div className="h-96">
                        {ageData && <Bar data={ageData} options={chartOptions} />}
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">사용자 알러지 차트</h2>
                    <div className="h-96">
                        {allergyData && <Pie data={allergyData} options={chartOptions} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GraphComponent;
