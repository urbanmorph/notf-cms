-- =====================================================
-- ADD KEYWORDS TO EXISTING CATEGORIES
-- Enables text matching for chatbot auto-categorization
-- =====================================================

-- City Amenities subcategories
UPDATE issue_categories SET keywords = ARRAY['library', 'books', 'reading room', 'public library'] WHERE code = 'libraries';
UPDATE issue_categories SET keywords = ARRAY['burial', 'cemetery', 'graveyard', 'crematorium'] WHERE code = 'burial_grounds';
UPDATE issue_categories SET keywords = ARRAY['playground', 'play area', 'children play', 'swings', 'slides'] WHERE code = 'playgrounds';
UPDATE issue_categories SET keywords = ARRAY['post office', 'postal service', 'mail', 'courier'] WHERE code = 'post_offices';
UPDATE issue_categories SET keywords = ARRAY['toilet', 'restroom', 'washroom', 'public toilet', 'loo', 'bathroom'] WHERE code = 'public_toilets';
UPDATE issue_categories SET keywords = ARRAY['park', 'garden', 'green space', 'walking path'] WHERE code = 'parks';
UPDATE issue_categories SET keywords = ARRAY['lake', 'pond', 'water body', 'tank'] WHERE code = 'lakes';

-- Bus Services subcategories
UPDATE issue_categories SET keywords = ARRAY['bus stop', 'bus shelter', 'bus stand', 'shelter'] WHERE code = 'bus_stops_shelters';
UPDATE issue_categories SET keywords = ARRAY['bus seat', 'seating', 'seats', 'no seat'] WHERE code = 'bus_seating';
UPDATE issue_categories SET keywords = ARRAY['bus frequency', 'bus timing', 'bus schedule', 'no bus', 'waiting'] WHERE code = 'bus_frequency';
UPDATE issue_categories SET keywords = ARRAY['bus condition', 'broken bus', 'dirty bus', 'old bus'] WHERE code = 'bus_condition';
UPDATE issue_categories SET keywords = ARRAY['bus route', 'route number', 'bus information', 'which bus'] WHERE code = 'bus_route_info';

-- Law and Order subcategories
UPDATE issue_categories SET keywords = ARRAY['theft', 'burglary', 'robbery', 'stolen', 'break in'] WHERE code = 'theft_burglary';
UPDATE issue_categories SET keywords = ARRAY['dowry', 'dowry harassment', 'dowry demand'] WHERE code = 'dowry';
UPDATE issue_categories SET keywords = ARRAY['sexual assault', 'rape', 'molestation', 'harassment', 'abuse'] WHERE code = 'sexual_assault';
UPDATE issue_categories SET keywords = ARRAY['arson', 'fire', 'burning', 'set fire'] WHERE code = 'arson';
UPDATE issue_categories SET keywords = ARRAY['cybercrime', 'online fraud', 'hacking', 'phishing', 'cyber attack'] WHERE code = 'cybercrime';

-- Drainage subcategories
UPDATE issue_categories SET keywords = ARRAY['flooding', 'flood', 'water logging', 'waterlogged', 'inundation'] WHERE code = 'flooding';
UPDATE issue_categories SET keywords = ARRAY['broken drain', 'damaged drain', 'drain damage', 'cracked drain'] WHERE code = 'broken_drain';
UPDATE issue_categories SET keywords = ARRAY['sewage contamination', 'sewage in water', 'contaminated water', 'dirty water'] WHERE code = 'sewage_contamination';

-- Elections subcategories
UPDATE issue_categories SET keywords = ARRAY['poll booth', 'polling station', 'voting booth', 'election center'] WHERE code = 'poll_booths';
UPDATE issue_categories SET keywords = ARRAY['voter enrollment', 'voter registration', 'voter list', 'voter roll', 'voter id'] WHERE code = 'voter_enrollment';
UPDATE issue_categories SET keywords = ARRAY['opinion poll', 'exit poll', 'election survey'] WHERE code = 'opinion_polls';

-- Environment subcategories
UPDATE issue_categories SET keywords = ARRAY['air quality', 'pollution', 'smog', 'smoke', 'air pollution', 'dust'] WHERE code = 'air_quality';
UPDATE issue_categories SET keywords = ARRAY['tree', 'trees', 'vegetation', 'plants', 'greenery', 'fallen tree', 'tree cutting', 'pruning'] WHERE code = 'trees_vegetation';

-- Water subcategories
UPDATE issue_categories SET keywords = ARRAY['water supply', 'no water', 'water cut', 'water shortage', 'dry tap', 'no supply'] WHERE code = 'water_supply';
UPDATE issue_categories SET keywords = ARRAY['water smell', 'bad smell', 'foul smell', 'stinking water', 'smelly water'] WHERE code = 'water_smell';
UPDATE issue_categories SET keywords = ARRAY['water colour', 'water color', 'dirty water', 'brown water', 'yellow water', 'cloudy water'] WHERE code = 'water_colour';
UPDATE issue_categories SET keywords = ARRAY['pipe leak', 'leakage', 'water leak', 'burst pipe', 'broken pipe', 'leaking pipe'] WHERE code = 'pipe_leak';

-- Buildings subcategories
UPDATE issue_categories SET keywords = ARRAY['illegal construction', 'unauthorized construction', 'illegal building', 'encroachment'] WHERE code = 'illegal_construction';
UPDATE issue_categories SET keywords = ARRAY['encroachment', 'illegal occupation', 'land grab', 'unauthorized occupation'] WHERE code = 'encroachment';
UPDATE issue_categories SET keywords = ARRAY['dangerous building', 'unsafe building', 'collapsing building', 'dilapidated building'] WHERE code = 'dangerous_building';

-- Civic Issues subcategories
UPDATE issue_categories SET keywords = ARRAY['loud noise', 'noise pollution', 'noise', 'loud music', 'disturbance', 'sound pollution'] WHERE code = 'loud_noise';
UPDATE issue_categories SET keywords = ARRAY['stray animals', 'stray dogs', 'stray cattle', 'stray cow', 'dogs', 'cattle'] WHERE code = 'stray_animals';

-- Power Supply subcategories
UPDATE issue_categories SET keywords = ARRAY['power cut', 'no power', 'electricity cut', 'power outage', 'blackout', 'no electricity', 'no light'] WHERE code = 'power_cut';
UPDATE issue_categories SET keywords = ARRAY['dangling wire', 'hanging wire', 'loose wire', 'exposed wire', 'dangerous wire'] WHERE code = 'dangling_wire';
UPDATE issue_categories SET keywords = ARRAY['meter', 'defective meter', 'broken meter', 'meter not working'] WHERE code = 'defective_meter';
UPDATE issue_categories SET keywords = ARRAY['power surge', 'voltage fluctuation', 'high voltage', 'low voltage'] WHERE code = 'power_surge';
UPDATE issue_categories SET keywords = ARRAY['transformer', 'transformer noise', 'transformer leaking', 'transformer issue'] WHERE code = 'transformer';
UPDATE issue_categories SET keywords = ARRAY['illegal connection', 'illegal electricity', 'power theft', 'unauthorized connection'] WHERE code = 'illegal_connection';

-- Roads, Traffic and Transport subcategories
UPDATE issue_categories SET keywords = ARRAY['road', 'pothole', 'road damage', 'bad road', 'broken road', 'road condition', 'road repair', 'crater', 'hole'] WHERE code = 'road_conditions';
UPDATE issue_categories SET keywords = ARRAY['traffic', 'traffic jam', 'congestion', 'traffic management', 'traffic police'] WHERE code = 'traffic_management';
UPDATE issue_categories SET keywords = ARRAY['signal', 'traffic signal', 'traffic light', 'signal not working', 'red light'] WHERE code = 'traffic_signals';
UPDATE issue_categories SET keywords = ARRAY['footpath', 'pavement', 'sidewalk', 'walking path', 'pedestrian path'] WHERE code = 'footpaths';
UPDATE issue_categories SET keywords = ARRAY['signage', 'road sign', 'traffic sign', 'direction board', 'sign board'] WHERE code = 'signage';
UPDATE issue_categories SET keywords = ARRAY['street light', 'streetlight', 'street lamp', 'light not working', 'no light', 'dark street', 'lamp', 'light pole'] WHERE code = 'street_lights';

-- Safety subcategories
UPDATE issue_categories SET keywords = ARRAY['children safety', 'child safety', 'kids safety', 'school safety'] WHERE code = 'safety_children';
UPDATE issue_categories SET keywords = ARRAY['elder safety', 'senior citizen', 'old age', 'elderly'] WHERE code = 'safety_elders';
UPDATE issue_categories SET keywords = ARRAY['road safety', 'pedestrian safety', 'crossing', 'zebra crossing'] WHERE code = 'safety_roads';
UPDATE issue_categories SET keywords = ARRAY['fire', 'fire safety', 'fire hazard', 'fire risk', 'fire accident'] WHERE code = 'safety_fire';
UPDATE issue_categories SET keywords = ARRAY['food safety', 'food poisoning', 'unhygienic food', 'bad food'] WHERE code = 'safety_food';

-- Sewage subcategories
UPDATE issue_categories SET keywords = ARRAY['sewage dumping', 'sewage disposal', 'sewage', 'waste water dumping'] WHERE code = 'sewage_dumping';
UPDATE issue_categories SET keywords = ARRAY['drain overflow', 'drain overflowing', 'blocked drain', 'clogged drain', 'drain block', 'choked drain'] WHERE code = 'drain_overflow';
UPDATE issue_categories SET keywords = ARRAY['water contamination', 'contaminated water', 'polluted water', 'impure water'] WHERE code = 'water_contamination';

-- Parent categories (general keywords)
UPDATE issue_categories SET keywords = ARRAY['amenities', 'facilities', 'public facilities'] WHERE code = 'city_amenities';
UPDATE issue_categories SET keywords = ARRAY['bus', 'public transport', 'bmtc', 'transport'] WHERE code = 'bus_services';
UPDATE issue_categories SET keywords = ARRAY['police', 'law', 'order', 'crime', 'safety', 'security'] WHERE code = 'law_order';
UPDATE issue_categories SET keywords = ARRAY['drain', 'drainage', 'water drainage', 'storm water'] WHERE code = 'drainage';
UPDATE issue_categories SET keywords = ARRAY['election', 'voting', 'vote', 'voter'] WHERE code = 'elections';
UPDATE issue_categories SET keywords = ARRAY['environment', 'pollution', 'ecology', 'nature'] WHERE code = 'environment';
UPDATE issue_categories SET keywords = ARRAY['water', 'drinking water', 'water supply'] WHERE code = 'water';
UPDATE issue_categories SET keywords = ARRAY['building', 'construction', 'structure'] WHERE code = 'buildings';
UPDATE issue_categories SET keywords = ARRAY['civic', 'civic issue', 'public nuisance'] WHERE code = 'civic_issues';
UPDATE issue_categories SET keywords = ARRAY['power', 'electricity', 'electrical', 'current'] WHERE code = 'power_supply';
UPDATE issue_categories SET keywords = ARRAY['road', 'traffic', 'transport', 'vehicle'] WHERE code = 'roads_traffic';
UPDATE issue_categories SET keywords = ARRAY['safety', 'security', 'protection'] WHERE code = 'safety';
UPDATE issue_categories SET keywords = ARRAY['sewage', 'waste water', 'sewerage'] WHERE code = 'sewage';

-- Verify keywords were added
SELECT code, name, array_length(keywords, 1) as keyword_count
FROM issue_categories
WHERE keywords IS NOT NULL AND array_length(keywords, 1) > 0
ORDER BY name;
