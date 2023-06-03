import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generateVideoThumbnails } from '@rajesh896/video-thumbnails-generator';
import React, { useEffect, useState, ChangeEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../components';
import { InfoBox } from '../components/box';
import { ButtonGray, ButtonOptions, CheckBox, Toggle } from '../components/button';
import { MainFooter } from '../components/footer';
import { InputUpload } from '../components/input';
import { NonUpload, Uploading } from '../components/upload';
import { title } from '../ultils/app';
import { slSetFullScrennMode } from '../store/action/slice/slice';

const UploadVideo = () => {
    // redux
    const dispatch = useDispatch();

    // useState
    const [caption, setCaption] = useState('');
    const [status, setStatus] = useState<string | number>('');
    const [conment, setConment] = useState(true);
    const [duet, setDuet] = useState(true);
    const [stitch, setStitch] = useState(true);
    const [checked, setChecked] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [listThumnail, setListThumnail] = useState<string[]>([]);
    const [videoLink, setVideoLink] = useState('');

    // handle funtion
    const handleSetFile = (e: ChangeEvent<HTMLInputElement>) => {
        const video: File | null = e.target.files && e.target.files[0];
        if (!video) return;
        if (!video.type.includes('video')) return;

        setCaption(video.name.split('.')[0]);
        setFile(video);
    };

    const thumnail = useCallback(async () => {
        if (!file) return;

        setVideoLink(URL.createObjectURL(file));

        try {
            const thumnails = await generateVideoThumbnails(file, 8, 'video');

            setListThumnail(thumnails);
        } catch (error) {
            console.log(error);
        }
    }, [file]);

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(videoLink);
        };
    }, [videoLink]);

    useEffect(() => {
        dispatch(slSetFullScrennMode(true));
        document.title = title.upload;

        return () => {
            dispatch(slSetFullScrennMode(false));
            document.title = title.home;
        };
    }, [dispatch]);

    useEffect(() => {
        thumnail();
    }, [thumnail]);

    return (
        <div
            className="pt-[86px] w-full h-full flex flex-col
            items-center justify-center bg-white-upload"
        >
            <div className="w-[1100px] h-[1025px] bg-white rounded-lg shadow-lg py-6 px-10">
                <div className="">
                    <h1 className="text-[22px] font-bold leading-[2.3rem]">Upload video</h1>
                    <span className="leading-[2.3rem] text-[17px] font-[400] text-white-opacity-50 mt-[2px]">Post a video to your account</span>
                </div>
                <div className="mt-6 mb-[130px] flex">
                    <div className="w-[260px] mt-6 h-[458px] rounded-lg border-2 border-dashed border-[rgba(22,24,35,0.2)] relative">
                        <input onChange={handleSetFile.bind(this)} id="videoUploadInput" type="file" hidden />
                        <label
                            htmlFor="videoUploadInput"
                            className="absolute inset-0 w-full h-full hover:bg-white-upload transition rounded-lg px-[35px] 
                            flex flex-col items-center justify-center"
                        >
                            <span className="text-[40px] text-white-opacity-50 ">
                                <FontAwesomeIcon icon={faCloudArrowUp} />
                            </span>
                            <span className="text-lg font-semibold leading-10">Select video to upload</span>
                            <span className="text-sm  text-white-opacity-75 font-medium mt-1 mb-6">Or drag and drop a file</span>
                            <div className="flex items-center flex-col justify-center text-center">
                                <span className="text-sm font-[400]  text-white-opacity-50 mb-[6px]">MP4 or WebM</span>
                                <span className="text-sm font-[400] text-white-opacity-50 mb-[6px]">720x1280 resolution or higher</span>
                                <span className="text-sm font-[400] text-white-opacity-50 mb-[6px]">Up to 30 minutes</span>
                                <span className="text-sm font-[400] text-white-opacity-50 mb-[6px]">Less than 2 GB</span>
                            </div>

                            <Button maxWidth={false} className="mt-8 w-full" primary>
                                <label htmlFor="videoUploadInput">Select file</label>
                            </Button>
                        </label>
                    </div>
                    <div className="flex-1 ml-6">
                        <div className="px-6 py-4 bg-white-upload rounded-sm mb-6 h-[104px] flex items-center">
                            <div className="flex items-start gap-3">
                                <img
                                    className="w-6 h-6 mt-[5px]"
                                    src="https://lf16-tiktok-common.ibytedtos.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/divide_black.e1e40d5b.svg"
                                    alt="upload"
                                />
                                <div>
                                    <span className="font-semibold text-16 leading-6">Divide videos and edit</span>
                                    <p className="text-white-opacity-75 text-sm leading-[22px]">
                                        You can quickly divide videos into multiple parts, remove redundant parts and turn landscape videos into portrait videos
                                    </p>
                                </div>
                            </div>
                            <div className="">
                                <Button primary>
                                    <span>Edit</span>
                                </Button>
                            </div>
                        </div>

                        <InfoBox
                            title="Caption"
                            subTitle={
                                <div className="text-[13px] text-white-opacity-50">
                                    <span>{caption === '' ? 0 : caption.length}</span>
                                    <span> / 150</span>
                                </div>
                            }
                        >
                            <InputUpload type="text" setValue={setCaption} value={caption} />
                        </InfoBox>

                        {file ? <Uploading video={videoLink} listThumnail={listThumnail} /> : <NonUpload />}
                        <InfoBox classNameBox="" title="Who can watch this video">
                            <ButtonOptions
                                value={status}
                                setValue={setStatus}
                                border="border border-white-opacity-12"
                                width={300}
                                height={36}
                                heightitem={42}
                                heightOptions={132}
                                backgroundInput="bg-white"
                                initContent="Private"
                                listContent={['Private', 'Public', 'Friends']}
                            />
                        </InfoBox>
                        <div className="leading-6"></div>
                        <InfoBox title="Allow users to:">
                            <div className="flex items-center w-[300px] gap-4">
                                <CheckBox classCheckIcon="text-[12px]" size={16} classNameTitle="text-16 font-[500]" title="Conment" checked={conment} setChecked={setConment} />

                                <CheckBox classCheckIcon="text-[12px]" size={16} classNameTitle="text-16 font-[500]" title="Duet" checked={duet} setChecked={setDuet} />

                                <CheckBox classCheckIcon="text-[12px]" size={16} classNameTitle="text-16 font-[500]" title="Stitch" checked={stitch} setChecked={setStitch} />
                            </div>
                        </InfoBox>

                        <div className="mt-6 flex items-center gap-4">
                            <span className="leading-6 font-semibold text-white-opacity">Run a copyright check</span>
                            <Toggle setChecked={setChecked} />
                        </div>

                        <div className="flex items-center mt-6 gap-4">
                            <ButtonGray border background="bg-white" ready width="164px" title="Discard" />
                            <ButtonGray width="164px" title="Post" cusor="cursor-not-allowed" />
                        </div>
                    </div>
                </div>
            </div>

            <MainFooter />
        </div>
    );
};

export default UploadVideo;
