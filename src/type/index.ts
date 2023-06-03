import reduxStore from '../store/redux';
import React, { ForwardRefExoticComponent } from 'react';
import { LinkProps } from 'react-router-dom';
import { Comment, ProfileInterface, ResponceAccount, ResponceAccountFull, ResponceCheckingUsername, ResponceUser, UpdateProps, User, Video } from '../interface';
import { AnyAction } from 'redux';

const { store } = reduxStore();

export type RootState = ReturnType<typeof store.getState>;

export type CustomButton = string | ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
export type apiSearchType = (value: string, type?: string) => Promise<ResponceAccount[]>;
export type apiGetUsersType = (page?: number, limit?: number, token?: string) => Promise<ResponceAccount[]>;
export type apiGetFollowersType = (page?: number, limit?: number, token?: string) => Promise<ResponceAccountFull>;
export type apiUserType = (email: string, password: string) => Promise<User>;
export type apiUpdateUser = (data: UpdateProps, token: string) => Promise<User>;
export type apiCheckingUSername = (username: string) => Promise<ResponceCheckingUsername>;
export type apiCurUserType = (token: string) => Promise<User>;
export type apiProfile = (nickname: string, token?: string) => Promise<ProfileInterface>;
export type SetCurUser = (token: string) => Promise<AnyAction>;
export type apiToken = (email: string, password: string) => Promise<ResponceUser>;
export type AppDispatch = typeof store.dispatch;
export type apiGetVideo = (page?: number, option?: {}) => Promise<Video[]>;
export type apiGetAVideo = (id: number | string | undefined) => Promise<Video>;
export type apiGetComments = (id: number | string | undefined) => Promise<Comment[]>;
export type initUserType = { image: string; to: string };
export type setVolumeType = () => boolean;
