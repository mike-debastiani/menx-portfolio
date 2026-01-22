import React from 'react'

const iconStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  lineHeight: 1,
  padding: '2px 4px',
}

export const FontIcon = () => <span style={iconStyle}>Font</span>
export const WeightIcon = () => <span style={iconStyle}>Weight</span>
export const SizeIcon = () => <span style={iconStyle}>Size</span>
export const LineHeightIcon = () => <span style={iconStyle}>LH</span>
export const ColorIcon = () => <span style={iconStyle}>Color</span>
