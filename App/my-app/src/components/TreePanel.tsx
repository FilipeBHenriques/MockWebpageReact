import React, { useState } from "react";
import './TreePanel.css'; // Import CSS for styling

type Workstation = {
  id: string;
};

type Activity = {
  name: string;
  workstations: Workstation[];
};

type Site = {
  name: string;
  activities: Activity[];
};

type Region = {
  name: string;
  sites: Site[];
};

type TreePanelProps = {
  data: Region[];
};

const TreePanel: React.FC<TreePanelProps> = ({ data }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderTree = (regions: Region[]) => {
    return regions.map((region, regionIdx) => (
      <div key={`region-${regionIdx}`} className="tree-node">
        <div
          className="tree-item region"
          onClick={() => toggleExpand(`region-${regionIdx}`)}
        >
          {/* Only add arrows and region name */}
          {expanded[`region-${regionIdx}`] ? "├──" : "└──"} <strong>{region.name}</strong>
        </div>
        {expanded[`region-${regionIdx}`] && (
          <div className="tree-child">
            {region.sites.map((site, siteIdx) => (
              <div key={`site-${siteIdx}`} className="tree-node">
                <div
                  className="tree-item"
                  onClick={() =>
                    toggleExpand(`site-${regionIdx}-${siteIdx}`)
                  }
                >
                  {/* Only add arrows and site name */}
                  {expanded[`site-${regionIdx}-${siteIdx}`] ? "├──" : "└──"} {site.name}
                </div>
                {expanded[`site-${regionIdx}-${siteIdx}`] && (
                  <div className="tree-child">
                    {site.activities.map((activity, activityIdx) => (
                      <div key={`activity-${activityIdx}`} className="tree-node">
                        <div
                          className="tree-item"
                          onClick={() =>
                            toggleExpand(
                              `activity-${regionIdx}-${siteIdx}-${activityIdx}`
                            )
                          }
                        >
                          {/* Only add arrows and activity name */}
                          {expanded[
                            `activity-${regionIdx}-${siteIdx}-${activityIdx}`
                          ]
                            ? "├──"
                            : "└──"}{" "}
                          {activity.name}
                        </div>
                        {expanded[
                          `activity-${regionIdx}-${siteIdx}-${activityIdx}`
                        ] && (
                          <div className="tree-child">
                            {activity.workstations.map((workstation, wsIdx) => (
                              <div key={`workstation-${wsIdx}`} className="tree-item">
                                {/* Only add arrows and workstation ID */}
                                └── {workstation.id}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    ));
  };

  const role = "Admin";  

  return (
    <div className="tree-container">
      {/* Display Role Information */}
      <div className="role-info">
        <p>Role: <strong>{role}</strong></p>
      </div>

      {renderTree(data)}
    </div>
  );
};

export default TreePanel;
