import { useState, useEffect } from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import { getDetailUser } from "../../api/userapi/userAPI.js";
import {formatDate} from "../../common/CommonTableComponent.jsx";

function UserDetailComponent() {
    const param = useParams();
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");

    const no = Number(param.uno);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDetailUser(no);
                setUserData(data);
            } catch (error) {
                console.error("사용자 정보를 가져오는 데 오류가 발생했습니다:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [no]); // no가 변경될 때마다 데이터 재페치


    const handleBackClick = () => {
        if (page) navigate(`/user/list?page=${page}`);
        else navigate('/user/list');
    };

    if (loading) {
        return <p>로딩 중...</p>;
    }

    if (!userData) {
        return <p>사용자 정보를 찾을 수 없습니다.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">사용자 상세 정보</h1>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <p className="text-gray-700 mb-2">
                    <strong>사용자 번호:</strong> {userData.uno}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>이름:</strong> {userData.username}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>이메일:</strong> {userData.email}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>전화번호:</strong> {userData.callNumber}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>생년월일:</strong> {formatDate(userData.birth)}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>성별:</strong> {userData.gender === "M" ? "남성" : "여성"}
                </p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">알레르기 정보</h2>
                {userData.allergyList && userData.allergyList.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {userData.allergyList.map((allergy, index) => (
                            <li key={index} className="text-gray-700 mb-1">
                                {allergy}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">등록된 알레르기 정보가 없습니다.</p>
                )}
            </div>

            <button
                onClick={handleBackClick}
                className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
            >
                목록으로 돌아가기
            </button>
        </div>
    );
}

export default UserDetailComponent;
