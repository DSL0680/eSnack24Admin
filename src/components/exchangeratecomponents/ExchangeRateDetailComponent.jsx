import React, { useEffect, useState } from "react";
import {deleteExchangeRate, editExchangeRate, readExchangeRate} from "../../api/exchangerateapi/exchangeRateAPI.js";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import CommonModal from "../../common/CommonModal.jsx";
import {useSelector} from "react-redux";

const init = {
    baseCurrency: '',
    targetCurrency: '',
    rate: 0.0,
    admname: '',
    erupdate: ''
}

const ExchangeRateDetailComponent = () => {
    const [data, setData] = useState(init);
    const [updateData, setUpdateData] = useState({rate: '', erno: 0, admno: 0});
    const [modalOpen, setModalOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [modalFn, setModalFn] = useState(null);
    const [closeFn, setCloseFn] = useState(null);

    const param = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const page = searchParams.get("page");

    const auth = useSelector((state) => state.auth);
    const admno = auth.admno;

    useEffect(() => {
        setUpdateData({ ...updateData, erno: param.erno, admno: admno });

        readExchangeRate(param.erno).then((res) => {
            setData(res);
        });
    }, [param.erno]);

    const handleUpdateClick = (e) => {
        e.preventDefault();
        setMsg("수정");
        setUpdateData({ ...updateData, erno: param.erno, admno: admno });

        setModalFn(() => () => editExchangeRate(updateData));
        setCloseFn(() => () => setModalOpen(false));
        setModalOpen(true);
    };

    const handleBackClick = () => {
        if (page) navigate(`/exchange-rate/list?page=${page}`);
        else navigate('/exchange-rate/list');
    };

    const handleDeleteClick = () => {
        setMsg("삭제");
        setModalFn(() => () => deleteExchangeRate({admno: admno, erno: param.erno}));
        setCloseFn(() => () => {
            setModalOpen(false);
            handleBackClick();
        });
        setModalOpen(true);
    };

    return (
        <>
            {modalOpen && (
                <CommonModal
                    isOpen={modalOpen}
                    msg={msg}
                    fn={modalFn}
                    closeModal={closeFn}
                    cancelFn={() => setModalOpen(false)}
                />
            )}

            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">환율 정보 수정</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">기본 통화</label>
                        <input
                            type="text"
                            value={data.baseCurrency}
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">목표 통화</label>
                        <input
                            type="text"
                            value={data.targetCurrency}
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">환율  (1000원 당 목표 통화를 입력하세요)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={updateData.rate !== "" ? updateData.rate : data.rate}
                            onChange={(e) =>
                                setUpdateData((prev) => ({...prev, rate: e.target.value}))
                            }
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">담당자</label>
                        <input
                            type="text"
                            value={data.admname}
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">수정 시간</label>
                        <input
                            type="text"
                            value={data.erupdate}
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                </div>
                <div className="mt-6 text-right">
                    <button
                        onClick={handleUpdateClick}
                        className="w-full md:w-auto px-6 py-3 bg-[#F9BB00] hover:bg-[#F9BB00] text-white font-semibold rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out"
                    >
                        저장
                    </button>
                </div>
                <div className="mt-6 flex flex-wrap justify-end space-x-4 gap-4">
                    <button
                        onClick={handleDeleteClick}
                        className="w-full md:w-auto px-6 py-3 bg-[#F57C00] hover:bg-[#F57C00] text-white font-semibold rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out"
                    >
                        삭제
                    </button>
                    <button
                        onClick={handleBackClick}
                        className="w-full md:w-auto px-6 py-3 bg-[#6B7280] text-white font-semibold rounded-lg shadow-md hover:bg-[#4B5D62] transition"
                    >
                        목록
                    </button>
                </div>

            </div>
        </>
    );
};

export default ExchangeRateDetailComponent;