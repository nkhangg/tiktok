import reduxStore from '../store/redux';
import React, { ForwardRefExoticComponent } from 'react';
import { LinkProps } from 'react-router-dom';
import { ResponceAccount, Video } from '../interface';

const store = reduxStore();

export type RootState = ReturnType<typeof store.getState>;

export type CustomButton = string | ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
export type apiSearchType = (value: string, type?: string) => Promise<ResponceAccount[]>;
export type apiGetUsersType = (page?: number, limit?: number) => Promise<ResponceAccount[]>;
export type apiGetVideo = (page?: number, option?: {}) => Promise<Video[]>;
