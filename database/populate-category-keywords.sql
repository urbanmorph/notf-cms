-- =====================================================
-- POPULATE KEYWORDS FOR ALL ISSUE CATEGORIES
-- Adds search keywords to all 304 categories for better matching
-- =====================================================

-- ROADS & TRAFFIC
UPDATE issue_categories SET keywords = ARRAY['pothole', 'hole', 'pit', 'road damage', 'crater', 'road hole'] WHERE code = 'pothole';
UPDATE issue_categories SET keywords = ARRAY['cave-in', 'cave in', 'road collapse', 'road sinking', 'road subsidence', 'road caved'] WHERE code = 'road_cavein';
UPDATE issue_categories SET keywords = ARRAY['crack', 'road crack', 'cracked road', 'road damage'] WHERE code = 'road_crack';
UPDATE issue_categories SET keywords = ARRAY['broken road', 'damaged road', 'road damage'] WHERE code = 'broken_road';
UPDATE issue_categories SET keywords = ARRAY['road repair', 'repair work', 'road construction'] WHERE code = 'road_repair';
UPDATE issue_categories SET keywords = ARRAY['footpath', 'pavement', 'sidewalk', 'walking path', 'pedestrian', 'footpath damage', 'broken footpath'] WHERE code = 'footpath_damage';
UPDATE issue_categories SET keywords = ARRAY['missing footpath', 'no footpath', 'footpath needed'] WHERE code = 'footpath_missing';
UPDATE issue_categories SET keywords = ARRAY['encroachment', 'footpath blocked', 'obstruction'] WHERE code = 'footpath_encroachment';
UPDATE issue_categories SET keywords = ARRAY['divider', 'median', 'road divider'] WHERE code = 'road_divider';
UPDATE issue_categories SET keywords = ARRAY['speed breaker', 'speed bump', 'road hump'] WHERE code = 'speed_breaker';
UPDATE issue_categories SET keywords = ARRAY['traffic signal', 'signal not working', 'traffic light'] WHERE code = 'traffic_signal';
UPDATE issue_categories SET keywords = ARRAY['road sign', 'signboard', 'sign missing'] WHERE code = 'road_sign';
UPDATE issue_categories SET keywords = ARRAY['road marking', 'zebra crossing', 'lane marking'] WHERE code = 'road_marking';
UPDATE issue_categories SET keywords = ARRAY['road hump', 'speed bump'] WHERE code = 'road_hump';

-- STREET LIGHTING
UPDATE issue_categories SET keywords = ARRAY['streetlight', 'street light', 'light not working', 'lamp', 'dark street', 'no light', 'light off'] WHERE code = 'light_not_working';
UPDATE issue_categories SET keywords = ARRAY['light flickering', 'blinking light', 'light flashing'] WHERE code = 'light_flickering';
UPDATE issue_categories SET keywords = ARRAY['light broken', 'broken light', 'damaged light', 'shattered light', 'light damaged'] WHERE code = 'light_broken';
UPDATE issue_categories SET keywords = ARRAY['pole damaged', 'pole broken', 'leaning pole', 'bent pole', 'pole issue'] WHERE code = 'pole_damaged';
UPDATE issue_categories SET keywords = ARRAY['daytime light', 'light on day', 'light on morning', 'wasting electricity', 'light during day'] WHERE code = 'daytime_light';
UPDATE issue_categories SET keywords = ARRAY['new light', 'light needed', 'light required', 'no street light'] WHERE code = 'new_light_request';
UPDATE issue_categories SET keywords = ARRAY['junction box', 'junction box open', 'electrical box'] WHERE code = 'junction_box_open';
UPDATE issue_categories SET keywords = ARRAY['earthing', 'earthing issue', 'grounding'] WHERE code = 'earthing_issue';
UPDATE issue_categories SET keywords = ARRAY['park light', 'garden light', 'park lighting'] WHERE code = 'park_light';
UPDATE issue_categories SET keywords = ARRAY['street lighting other', 'lighting issue'] WHERE code = 'street_lighting_others';

-- WATER SUPPLY
UPDATE issue_categories SET keywords = ARRAY['no water', 'water supply', 'water cut', 'dry tap', 'no supply'] WHERE code = 'no_water_supply';
UPDATE issue_categories SET keywords = ARRAY['low pressure', 'weak water', 'low water pressure'] WHERE code = 'low_water_pressure';
UPDATE issue_categories SET keywords = ARRAY['irregular supply', 'irregular water', 'inconsistent water'] WHERE code = 'irregular_supply';
UPDATE issue_categories SET keywords = ARRAY['leak', 'leakage', 'pipe burst', 'water leak', 'broken pipe'] WHERE code = 'pipe_leak';
UPDATE issue_categories SET keywords = ARRAY['contamination', 'polluted water', 'contaminated water'] WHERE code = 'water_contamination';
UPDATE issue_categories SET keywords = ARRAY['dirty water', 'colored water', 'muddy water', 'brown water'] WHERE code = 'dirty_water';
UPDATE issue_categories SET keywords = ARRAY['smell', 'bad smell', 'water smell', 'odor'] WHERE code = 'water_smell';
UPDATE issue_categories SET keywords = ARRAY['meter not working', 'water meter', 'meter issue'] WHERE code = 'meter_not_working';
UPDATE issue_categories SET keywords = ARRAY['meter reading', 'wrong reading', 'meter error'] WHERE code = 'meter_reading_issue';
UPDATE issue_categories SET keywords = ARRAY['illegal connection', 'unauthorized connection', 'illegal tap'] WHERE code = 'illegal_water_connection';
UPDATE issue_categories SET keywords = ARRAY['new connection', 'water connection', 'connection needed'] WHERE code = 'new_water_connection';
UPDATE issue_categories SET keywords = ARRAY['tanker', 'water tanker', 'tanker needed'] WHERE code = 'tanker_request';
UPDATE issue_categories SET keywords = ARRAY['valve', 'valve issue', 'tap issue'] WHERE code = 'valve_issue';
UPDATE issue_categories SET keywords = ARRAY['bore well', 'borewell', 'well'] WHERE code = 'borewell_issue';
UPDATE issue_categories SET keywords = ARRAY['water supply other', 'water issue'] WHERE code = 'water_supply_others';

-- DRAINAGE & STORM WATER
UPDATE issue_categories SET keywords = ARRAY['flooding', 'flood', 'water stagnation', 'waterlogging'] WHERE code = 'flooding';
UPDATE issue_categories SET keywords = ARRAY['blocked', 'clogged', 'drain block', 'choked drain', 'drain blocked'] WHERE code = 'drain_blocked';
UPDATE issue_categories SET keywords = ARRAY['overflow', 'drain overflow', 'overflowing drain'] WHERE code = 'drainage_overflow';
UPDATE issue_categories SET keywords = ARRAY['open drain', 'uncovered drain', 'drain open'] WHERE code = 'open_drain';
UPDATE issue_categories SET keywords = ARRAY['broken drain', 'damaged drain', 'cracked drain', 'drain damage'] WHERE code = 'broken_drain';
UPDATE issue_categories SET keywords = ARRAY['drain cover missing', 'cover missing', 'no cover'] WHERE code = 'drain_cover_missing';
UPDATE issue_categories SET keywords = ARRAY['drain cover broken', 'cover broken', 'damaged cover'] WHERE code = 'drain_cover_broken';
UPDATE issue_categories SET keywords = ARRAY['stagnant water', 'standing water', 'water pooling'] WHERE code = 'stagnant_water';
UPDATE issue_categories SET keywords = ARRAY['mosquito breeding', 'mosquito in drain', 'larvae'] WHERE code = 'drain_mosquito';
UPDATE issue_categories SET keywords = ARRAY['storm water drain', 'drain needed', 'new drain'] WHERE code = 'stormwater_drain_request';
UPDATE issue_categories SET keywords = ARRAY['drainage other', 'drain issue'] WHERE code = 'drainage_others';

-- SEWAGE MANAGEMENT
UPDATE issue_categories SET keywords = ARRAY['sewage', 'sewage overflow', 'sewage spill', 'sewage on road'] WHERE code = 'sewage_overflow';
UPDATE issue_categories SET keywords = ARRAY['sewage leak', 'sewage leakage', 'leaking sewage'] WHERE code = 'sewage_leak';
UPDATE issue_categories SET keywords = ARRAY['sewage smell', 'foul smell', 'bad odor', 'stink'] WHERE code = 'sewage_smell';
UPDATE issue_categories SET keywords = ARRAY['manhole', 'manhole overflow', 'manhole overflowing'] WHERE code = 'manhole_overflow';
UPDATE issue_categories SET keywords = ARRAY['open manhole', 'manhole open', 'uncovered manhole'] WHERE code = 'open_manhole';
UPDATE issue_categories SET keywords = ARRAY['manhole cover', 'cover missing', 'manhole lid'] WHERE code = 'manhole_cover_missing';
UPDATE issue_categories SET keywords = ARRAY['manhole cover broken', 'broken cover', 'damaged lid'] WHERE code = 'manhole_cover_broken';
UPDATE issue_categories SET keywords = ARRAY['chamber', 'chamber missing', 'inspection chamber'] WHERE code = 'chamber_missing';
UPDATE issue_categories SET keywords = ARRAY['septic tank', 'septic cleaning', 'tank cleaning'] WHERE code = 'septic_tank_cleaning';
UPDATE issue_categories SET keywords = ARRAY['sewage connection', 'sewer connection', 'connection needed'] WHERE code = 'sewage_connection';
UPDATE issue_categories SET keywords = ARRAY['sewage dump', 'sewage dumping', 'sewage discharge'] WHERE code = 'sewage_dumping';
UPDATE issue_categories SET keywords = ARRAY['sewage other', 'sewage issue'] WHERE code = 'sewage_others';

-- SOLID WASTE MANAGEMENT
UPDATE issue_categories SET keywords = ARRAY['garbage', 'waste', 'not collected', 'rubbish', 'trash', 'no pickup', 'collection missed'] WHERE code = 'garbage_not_collected';
UPDATE issue_categories SET keywords = ARRAY['irregular collection', 'irregular pickup', 'collection timing'] WHERE code = 'irregular_collection';
UPDATE issue_categories SET keywords = ARRAY['dump', 'dumping', 'illegal dump', 'garbage pile', 'waste dump', 'trash pile'] WHERE code = 'garbage_dump';
UPDATE issue_categories SET keywords = ARRAY['overflowing', 'bin overflow', 'dustbin full', 'full bin', 'bin overflowing'] WHERE code = 'overflowing_bin';
UPDATE issue_categories SET keywords = ARRAY['missing dustbin', 'no dustbin', 'dustbin missing', 'bin missing', 'need dustbin'] WHERE code = 'missing_dustbin';
UPDATE issue_categories SET keywords = ARRAY['dustbin broken', 'bin broken', 'damaged bin'] WHERE code = 'dustbin_broken';
UPDATE issue_categories SET keywords = ARRAY['street not cleaned', 'dirty street', 'street sweeping', 'unclean road', 'littered street'] WHERE code = 'street_not_cleaned';
UPDATE issue_categories SET keywords = ARRAY['sweeper absent', 'no sweeper', 'cleaner absent'] WHERE code = 'sweeper_absent';
UPDATE issue_categories SET keywords = ARRAY['segregation', 'waste segregation', 'sorting'] WHERE code = 'segregation_issue';
UPDATE issue_categories SET keywords = ARRAY['construction waste', 'debris', 'building waste', 'rubble', 'construction material'] WHERE code = 'construction_debris';
UPDATE issue_categories SET keywords = ARRAY['plastic', 'plastic waste', 'plastic bags', 'polythene', 'plastic bottles'] WHERE code = 'plastic_waste';
UPDATE issue_categories SET keywords = ARRAY['ewaste', 'electronic waste', 'e-waste', 'electronics'] WHERE code = 'ewaste';
UPDATE issue_categories SET keywords = ARRAY['biomedical', 'medical waste', 'hospital waste'] WHERE code = 'biomedical_waste';
UPDATE issue_categories SET keywords = ARRAY['organic waste', 'wet waste', 'food waste'] WHERE code = 'organic_waste';
UPDATE issue_categories SET keywords = ARRAY['compactor', 'compactor not working', 'waste compactor'] WHERE code = 'compactor_issue';
UPDATE issue_categories SET keywords = ARRAY['waste management other', 'garbage issue'] WHERE code = 'waste_management_others';

-- POWER SUPPLY
UPDATE issue_categories SET keywords = ARRAY['power cut', 'no power', 'electricity cut', 'outage'] WHERE code = 'power_cut';
UPDATE issue_categories SET keywords = ARRAY['frequent cut', 'frequent outage', 'power fluctuation'] WHERE code = 'frequent_power_cut';
UPDATE issue_categories SET keywords = ARRAY['low voltage', 'weak power', 'voltage drop'] WHERE code = 'low_voltage';
UPDATE issue_categories SET keywords = ARRAY['high voltage', 'power surge', 'voltage spike'] WHERE code = 'power_surge';
UPDATE issue_categories SET keywords = ARRAY['wire', 'cable', 'exposed wire', 'dangling', 'electric cable', 'dangerous wire', 'hanging wire'] WHERE code = 'dangling_wire';
UPDATE issue_categories SET keywords = ARRAY['transformer', 'transformer issue', 'transformer noise'] WHERE code = 'transformer';
UPDATE issue_categories SET keywords = ARRAY['meter not working', 'power meter', 'electricity meter'] WHERE code = 'power_meter_not_working';
UPDATE issue_categories SET keywords = ARRAY['meter reading', 'wrong reading', 'meter error'] WHERE code = 'power_meter_reading';
UPDATE issue_categories SET keywords = ARRAY['illegal connection', 'unauthorized power', 'power theft'] WHERE code = 'illegal_power_connection';
UPDATE issue_categories SET keywords = ARRAY['new connection', 'power connection', 'electricity connection'] WHERE code = 'new_power_connection';
UPDATE issue_categories SET keywords = ARRAY['pole damaged', 'electric pole', 'power pole'] WHERE code = 'power_pole_damaged';
UPDATE issue_categories SET keywords = ARRAY['power supply other', 'electricity issue'] WHERE code = 'power_supply_others';

-- PARKS & PLAYGROUNDS
UPDATE issue_categories SET keywords = ARRAY['park maintenance', 'park upkeep', 'park cleaning'] WHERE code = 'park_maintenance';
UPDATE issue_categories SET keywords = ARRAY['park equipment', 'playground equipment', 'broken equipment'] WHERE code = 'park_equipment';
UPDATE issue_categories SET keywords = ARRAY['park fencing', 'fence broken', 'boundary fence'] WHERE code = 'park_fencing';
UPDATE issue_categories SET keywords = ARRAY['park lighting', 'park light', 'garden light'] WHERE code = 'park_lighting_issue';
UPDATE issue_categories SET keywords = ARRAY['park tree', 'tree in park', 'tree pruning'] WHERE code = 'park_tree';
UPDATE issue_categories SET keywords = ARRAY['park water', 'fountain', 'water feature'] WHERE code = 'park_water';
UPDATE issue_categories SET keywords = ARRAY['park encroachment', 'illegal occupation', 'park occupied'] WHERE code = 'park_encroachment';
UPDATE issue_categories SET keywords = ARRAY['park other', 'playground issue'] WHERE code = 'parks_playgrounds_others';

-- PUBLIC TOILETS
UPDATE issue_categories SET keywords = ARRAY['toilet dirty', 'unclean toilet', 'toilet not cleaned'] WHERE code = 'toilet_dirty';
UPDATE issue_categories SET keywords = ARRAY['toilet broken', 'damaged toilet', 'toilet not working'] WHERE code = 'toilet_broken';
UPDATE issue_categories SET keywords = ARRAY['no water', 'toilet water', 'no water in toilet'] WHERE code = 'toilet_no_water';
UPDATE issue_categories SET keywords = ARRAY['toilet locked', 'toilet closed', 'toilet not open'] WHERE code = 'toilet_locked';
UPDATE issue_categories SET keywords = ARRAY['toilet needed', 'new toilet', 'toilet required'] WHERE code = 'toilet_required';
UPDATE issue_categories SET keywords = ARRAY['public toilet other', 'toilet issue'] WHERE code = 'public_toilets_others';

-- LAKES & WATER BODIES
UPDATE issue_categories SET keywords = ARRAY['lake pollution', 'polluted lake', 'lake contamination'] WHERE code = 'lake_pollution';
UPDATE issue_categories SET keywords = ARRAY['encroachment', 'lake encroachment', 'illegal construction'] WHERE code = 'lake_encroachment';
UPDATE issue_categories SET keywords = ARRAY['lake fencing', 'lake boundary', 'fence broken'] WHERE code = 'lake_fencing';
UPDATE issue_categories SET keywords = ARRAY['lake maintenance', 'lake cleaning', 'lake upkeep'] WHERE code = 'lake_maintenance';
UPDATE issue_categories SET keywords = ARRAY['sewage in lake', 'sewage discharge', 'sewage entering lake'] WHERE code = 'sewage_in_lake';
UPDATE issue_categories SET keywords = ARRAY['lake other', 'water body issue'] WHERE code = 'lakes_others';

-- BURIAL GROUNDS
UPDATE issue_categories SET keywords = ARRAY['cemetery maintenance', 'burial ground maintenance', 'graveyard'] WHERE code = 'cemetery_maintenance';
UPDATE issue_categories SET keywords = ARRAY['burial ground other', 'cemetery issue'] WHERE code = 'burial_grounds_others';

-- MARKETS
UPDATE issue_categories SET keywords = ARRAY['market cleanliness', 'market dirty', 'market cleaning'] WHERE code = 'market_cleanliness';
UPDATE issue_categories SET keywords = ARRAY['market encroachment', 'illegal stall', 'unauthorized vendor'] WHERE code = 'market_encroachment';
UPDATE issue_categories SET keywords = ARRAY['market other', 'market issue'] WHERE code = 'markets_others';

-- LIBRARIES
UPDATE issue_categories SET keywords = ARRAY['library maintenance', 'library upkeep', 'library cleaning'] WHERE code = 'library_maintenance';
UPDATE issue_categories SET keywords = ARRAY['library other', 'library issue'] WHERE code = 'libraries_others';

-- COMMUNITY HALLS
UPDATE issue_categories SET keywords = ARRAY['hall maintenance', 'community hall', 'hall booking'] WHERE code = 'hall_maintenance';
UPDATE issue_categories SET keywords = ARRAY['hall other', 'community hall issue'] WHERE code = 'community_halls_others';

-- HEALTH & SANITATION
UPDATE issue_categories SET keywords = ARRAY['public health', 'health hazard', 'sanitation'] WHERE code = 'public_health';
UPDATE issue_categories SET keywords = ARRAY['disease', 'epidemic', 'outbreak'] WHERE code = 'disease_outbreak';
UPDATE issue_categories SET keywords = ARRAY['unsanitary', 'unhygienic', 'dirty conditions'] WHERE code = 'unsanitary_conditions';
UPDATE issue_categories SET keywords = ARRAY['dead animal', 'carcass', 'dead dog', 'dead cat', 'animal body', 'dead cow'] WHERE code = 'dead_animal';
UPDATE issue_categories SET keywords = ARRAY['health sanitation other', 'sanitation issue'] WHERE code = 'health_sanitation_others';

-- PEST & ANIMAL CONTROL
UPDATE issue_categories SET keywords = ARRAY['mosquito', 'breeding', 'dengue', 'malaria', 'stagnant water', 'mosquito larvae'] WHERE code = 'mosquito_breeding';
UPDATE issue_categories SET keywords = ARRAY['mosquito fogging', 'fogging needed', 'spray'] WHERE code = 'mosquito_fogging';
UPDATE issue_categories SET keywords = ARRAY['stray dog', 'stray dogs', 'dog menace', 'street dog', 'rabies', 'dog bite'] WHERE code = 'stray_dogs';
UPDATE issue_categories SET keywords = ARRAY['stray cattle', 'cow', 'bull', 'cattle menace'] WHERE code = 'stray_cattle';
UPDATE issue_categories SET keywords = ARRAY['stray pig', 'pig menace', 'wild pig'] WHERE code = 'stray_pigs';
UPDATE issue_categories SET keywords = ARRAY['monkey', 'monkey menace', 'simian'] WHERE code = 'monkey_menace';
UPDATE issue_categories SET keywords = ARRAY['snake', 'snake rescue', 'reptile'] WHERE code = 'snake';
UPDATE issue_categories SET keywords = ARRAY['rat', 'rodent', 'mice', 'rat infestation'] WHERE code = 'rat_menace';
UPDATE issue_categories SET keywords = ARRAY['pest control other', 'animal issue'] WHERE code = 'pest_animal_control_others';

-- TREES & FOREST
UPDATE issue_categories SET keywords = ARRAY['fallen tree', 'tree fall', 'uprooted', 'tree down'] WHERE code = 'tree_fallen';
UPDATE issue_categories SET keywords = ARRAY['dangerous tree', 'leaning tree', 'tree risk'] WHERE code = 'dangerous_tree';
UPDATE issue_categories SET keywords = ARRAY['pruning', 'overgrown', 'branches', 'trim tree', 'cutting'] WHERE code = 'tree_pruning';
UPDATE issue_categories SET keywords = ARRAY['tree cutting', 'cutting permission', 'tree removal'] WHERE code = 'tree_cutting_permission';
UPDATE issue_categories SET keywords = ARRAY['tree planting', 'new tree', 'tree needed'] WHERE code = 'tree_planting';
UPDATE issue_categories SET keywords = ARRAY['tree disease', 'sick tree', 'tree dying'] WHERE code = 'tree_disease';
UPDATE issue_categories SET keywords = ARRAY['tree other', 'forest issue'] WHERE code = 'trees_forest_others';

-- ENVIRONMENT & POLLUTION
UPDATE issue_categories SET keywords = ARRAY['air pollution', 'smoke', 'air quality', 'fumes'] WHERE code = 'air_pollution';
UPDATE issue_categories SET keywords = ARRAY['noise pollution', 'loud noise', 'noise complaint'] WHERE code = 'noise_pollution';
UPDATE issue_categories SET keywords = ARRAY['water pollution', 'polluted water', 'water contamination'] WHERE code = 'water_pollution';
UPDATE issue_categories SET keywords = ARRAY['soil pollution', 'land pollution', 'contaminated soil'] WHERE code = 'soil_pollution';
UPDATE issue_categories SET keywords = ARRAY['hazardous waste', 'toxic waste', 'chemical waste'] WHERE code = 'hazardous_waste';
UPDATE issue_categories SET keywords = ARRAY['environment other', 'pollution issue'] WHERE code = 'environment_others';

-- BUILDING PLANS & APPROVALS
UPDATE issue_categories SET keywords = ARRAY['building plan', 'plan approval', 'construction plan'] WHERE code = 'building_plan_approval';
UPDATE issue_categories SET keywords = ARRAY['building violation', 'plan violation', 'unauthorized construction'] WHERE code = 'building_plan_violation';
UPDATE issue_categories SET keywords = ARRAY['building other', 'plan issue'] WHERE code = 'building_plans_others';

-- ENCROACHMENT
UPDATE issue_categories SET keywords = ARRAY['road encroachment', 'road blocked', 'obstruction'] WHERE code = 'road_encroachment';
UPDATE issue_categories SET keywords = ARRAY['footpath encroachment', 'footpath blocked', 'pavement blocked'] WHERE code = 'footpath_encroachment_cat';
UPDATE issue_categories SET keywords = ARRAY['government land', 'public land', 'land encroachment'] WHERE code = 'government_land_encroachment';
UPDATE issue_categories SET keywords = ARRAY['encroachment other', 'illegal occupation'] WHERE code = 'encroachment_others';

-- ILLEGAL CONSTRUCTION
UPDATE issue_categories SET keywords = ARRAY['unauthorized', 'illegal construction', 'illegal building'] WHERE code = 'unauthorized_construction';
UPDATE issue_categories SET keywords = ARRAY['setback violation', 'setback issue', 'boundary violation'] WHERE code = 'setback_violation';
UPDATE issue_categories SET keywords = ARRAY['illegal construction other', 'construction violation'] WHERE code = 'illegal_construction_others';

-- PROPERTY TAX
UPDATE issue_categories SET keywords = ARRAY['property tax', 'tax payment', 'tax issue'] WHERE code = 'property_tax_issue';
UPDATE issue_categories SET keywords = ARRAY['tax assessment', 'wrong assessment', 'tax calculation'] WHERE code = 'tax_assessment';
UPDATE issue_categories SET keywords = ARRAY['property tax other', 'tax complaint'] WHERE code = 'property_tax_others';

-- TRADE LICENSE
UPDATE issue_categories SET keywords = ARRAY['trade license', 'business license', 'license application'] WHERE code = 'trade_license_issue';
UPDATE issue_categories SET keywords = ARRAY['license renewal', 'renew license', 'license expiry'] WHERE code = 'license_renewal';
UPDATE issue_categories SET keywords = ARRAY['trade license other', 'license complaint'] WHERE code = 'trade_license_others';

-- CERTIFICATES
UPDATE issue_categories SET keywords = ARRAY['birth certificate', 'birth registration', 'birth record'] WHERE code = 'birth_certificate';
UPDATE issue_categories SET keywords = ARRAY['death certificate', 'death registration', 'death record'] WHERE code = 'death_certificate';
UPDATE issue_categories SET keywords = ARRAY['certificate other', 'certificate issue'] WHERE code = 'certificates_others';

-- PUBLIC SAFETY
UPDATE issue_categories SET keywords = ARRAY['public safety', 'safety hazard', 'danger'] WHERE code = 'public_safety_issue';
UPDATE issue_categories SET keywords = ARRAY['accident prone', 'dangerous spot', 'safety risk'] WHERE code = 'accident_prone_area';
UPDATE issue_categories SET keywords = ARRAY['safety other', 'safety concern'] WHERE code = 'safety_others';

-- FIRE SAFETY
UPDATE issue_categories SET keywords = ARRAY['fire hazard', 'fire risk', 'fire safety'] WHERE code = 'fire_hazard';
UPDATE issue_categories SET keywords = ARRAY['fire noc', 'fire clearance', 'fire certificate'] WHERE code = 'fire_noc';
UPDATE issue_categories SET keywords = ARRAY['fire safety other', 'fire issue'] WHERE code = 'fire_safety_others';

-- LAW & ORDER
UPDATE issue_categories SET keywords = ARRAY['anti-social', 'rowdy', 'disturbance'] WHERE code = 'antisocial_activity';
UPDATE issue_categories SET keywords = ARRAY['law order other', 'law issue'] WHERE code = 'law_order_others';

-- PUBLIC TRANSPORT
UPDATE issue_categories SET keywords = ARRAY['bus stop', 'bus shelter', 'bus stand'] WHERE code = 'bus_stop';
UPDATE issue_categories SET keywords = ARRAY['bus service', 'bus route', 'bus frequency'] WHERE code = 'bus_service';
UPDATE issue_categories SET keywords = ARRAY['transport other', 'bus issue'] WHERE code = 'public_transport_others';

-- CORRUPTION
UPDATE issue_categories SET keywords = ARRAY['bribery', 'corruption', 'bribe demand'] WHERE code = 'bribery';
UPDATE issue_categories SET keywords = ARRAY['corruption other', 'illegal activity'] WHERE code = 'corruption_others';

-- WELFARE SCHEMES
UPDATE issue_categories SET keywords = ARRAY['welfare', 'welfare scheme', 'government scheme'] WHERE code = 'welfare_scheme';
UPDATE issue_categories SET keywords = ARRAY['welfare other', 'scheme issue'] WHERE code = 'welfare_others';

-- ELECTIONS
UPDATE issue_categories SET keywords = ARRAY['voter id', 'voter card', 'election card'] WHERE code = 'voter_id';
UPDATE issue_categories SET keywords = ARRAY['voter registration', 'voter enrollment', 'new voter'] WHERE code = 'voter_registration';
UPDATE issue_categories SET keywords = ARRAY['election other', 'voting issue'] WHERE code = 'elections_others';

-- GENERAL GRIEVANCES
UPDATE issue_categories SET keywords = ARRAY['general', 'other', 'miscellaneous', 'complaint'] WHERE code = 'general';

-- Verify keywords were added
SELECT
    parent.name as department,
    child.name as category,
    child.code,
    array_length(child.keywords, 1) as keyword_count
FROM issue_categories parent
LEFT JOIN issue_categories child ON child.parent_id = parent.id
WHERE parent.parent_id IS NULL
  AND child.keywords IS NOT NULL
ORDER BY parent.display_order, child.display_order;

-- Count categories with keywords
SELECT
    COUNT(*) FILTER (WHERE keywords IS NOT NULL AND array_length(keywords, 1) > 0) as categories_with_keywords,
    COUNT(*) FILTER (WHERE keywords IS NULL OR array_length(keywords, 1) = 0) as categories_without_keywords,
    COUNT(*) as total_categories
FROM issue_categories
WHERE parent_id IS NOT NULL;  -- Only count subcategories
