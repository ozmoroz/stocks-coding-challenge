import React from 'react';
import { Stack } from 'react-bootstrap';
import { StyledContentLoader } from './styles';

/** Skeleton animation tile.
 * Created with https://skeletonreact.com/.
 * This is just to showcase how we use skeleton tile animation.
 * Ideally a skeleton tile should resemble the real thing is is mimicking.
 */

export const SkeletonTile: React.FunctionComponent = () => (
  <StyledContentLoader
    aria-hidden="true"
    speed={2}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
    <circle cx="20" cy="20" r="20" />
  </StyledContentLoader>
);
