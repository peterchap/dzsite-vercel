import React from 'react';
import { render } from '@testing-library/react';
import HowItWorksPipeline from '../components/sections/blocks/HowItWorksPipeline';

describe('HowItWorksPipeline Component', () => {
  it('renders default fallback data when no props are provided', () => {
    const { getByText } = render(<HowItWorksPipeline />);

    // Default headline
    expect(getByText('From Raw Telemetry to Defensive Action')).toBeDefined();
    
    // Default stages
    expect(getByText('Ingestion at Scale')).toBeDefined();
    expect(getByText('Graph Enrichment')).toBeDefined();
    expect(getByText('Edge Delivery')).toBeDefined();
  });

  it('renders mapped data correctly when populated from Sanity', () => {
    const mockHeadline = 'Custom Headline';
    const mockSubhead = 'Custom Subhead';
    const mockStages = [
      {
        stageNumber: '[01]',
        stageTitle: 'Test Stage 1',
        bodyText: 'Description for test stage 1'
      },
      {
        stageNumber: '[02]',
        stageTitle: 'Test Stage 2',
        bodyText: 'Description for test stage 2'
      }
    ];

    const { getByText, queryByText } = render(
      <HowItWorksPipeline 
        headline={mockHeadline} 
        subhead={mockSubhead} 
        stages={mockStages} 
      />
    );

    // Verify custom header
    expect(getByText(mockHeadline)).toBeDefined();
    expect(getByText(mockSubhead)).toBeDefined();

    // Verify mapped stages
    expect(getByText('[01]')).toBeDefined();
    expect(getByText('Test Stage 1')).toBeDefined();
    expect(getByText('Description for test stage 1')).toBeDefined();

    expect(getByText('[02]')).toBeDefined();
    expect(getByText('Test Stage 2')).toBeDefined();
    expect(getByText('Description for test stage 2')).toBeDefined();

    // Verify third stage is absent
    expect(queryByText('Edge Delivery')).toBeNull();
  });
});
