import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {checkExchangeRate, createExchangeRate} from "../../api/exchangerateapi/exchangeRateAPI.js";
import CommonModal from "../../common/CommonModal.jsx";

const init = {
    targetCurrency: "",
    rate: "",
    admno: 0
};

const ExchangeRateCreateComponent = () => {

    const [data, setData] = useState(init);
    const [modalOpen, setModalOpen] = useState(false);
    const [failModal, setFailModal] = useState(false);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const page = searchParams.get("page");

    const auth = useSelector((state) => state.auth);
    const admno = auth.admno;

    const handleBackClick = () => {

        if (page) navigate(`/exchange-rate/list?page=${page}`);
        else navigate('/exchange-rate/list');
    };

    const handleClickCreate = () => {

        console.log(data.targetCurrency);

        checkExchangeRate(data.targetCurrency).then((res) => {

            if(res === false) setModalOpen(true);
            else setFailModal(true);
        })
    }

    const closeFn = () => {

        setModalOpen(false);

        handleBackClick();
    }

    useEffect(() => {

        setData({ ...data, admno: admno });

        console.log(data);
    }, [admno])

    return (
        <>
            {modalOpen && (
                <CommonModal
                    isOpen={modalOpen}
                    msg={"저장"}
                    fn={() => createExchangeRate(data)}
                    closeModal={closeFn}
                    cancelFn={() => setModalOpen(false)}
                />
            )}

            {failModal && (
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto transition-transform transform-gpu">
                    <p className="text-center text-green-600 text-lg font-semibold mb-4">
                        등록 실패(같은 항목 존재)
                    </p>
                    <div className="flex justify-center">
                        <button
                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 focus:outline-none focus:ring focus:ring-green-500"
                            onClick={() => setFailModal(false)}
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">환율 정보 등록</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">기본 통화</label>
                        <input
                            type="text"
                            value="KRW"
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">목표 통화</label>
                        <input
                            type="text"
                            value={data.targetCurrency}
                            onChange={(e) =>
                                setData({...data, targetCurrency: e.target.value})
                            }
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                            placeholder="예: KRW"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">환율</label>
                        <input
                            type="number"
                            step="0.01"
                            value={data.rate}
                            onChange={(e) =>
                                setData({...data, rate: e.target.value})
                            }
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                            placeholder="예: 1250.50"
                        />
                    </div>
                </div>
                <div className="mt-6 text-right">
                    <button
                        onClick={handleClickCreate}
                        className="bg-green-500 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                    >
                        저장
                    </button>
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleBackClick}
                        className="bg-gray-500 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-200"
                    >
                        목록
                    </button>
                </div>
            </div>
        </>
    );
};

export default ExchangeRateCreateComponent;
