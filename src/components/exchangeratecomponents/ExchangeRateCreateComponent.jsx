import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {createExchangeRate} from "../../api/exchangerateapi/exchangeRateAPI.js";
import CommonModal from "../../common/CommonModal.jsx";

const init = {
    baseCurrency: "",
    targetCurrency: "",
    rate: "",
    admno: 0
};

const ExchangeRateCreateComponent = () => {

    const [data, setData] = useState(init);
    const [modalOpen, setModalOpen] = useState(false);

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

        setModalOpen(true);
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

            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">환율 정보 등록</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">기본 통화</label>
                        <input
                            type="text"
                            value={data.baseCurrency}
                            onChange={(e) =>
                                setData({...data, baseCurrency: e.target.value})
                            }
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                            placeholder="예: USD"
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
