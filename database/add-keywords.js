#!/usr/bin/env node
/**
 * Add keywords to all issue categories
 * Enables text matching for chatbot auto-categorization
 */

const { createClient } = require('@supabase/supabase-js');

// Category keywords mapping
const categoryKeywords = {
    // City Amenities subcategories
    'libraries': ['library', 'books', 'reading room', 'public library'],
    'burial_grounds': ['burial', 'cemetery', 'graveyard', 'crematorium'],
    'playgrounds': ['playground', 'play area', 'children play', 'swings', 'slides'],
    'post_offices': ['post office', 'postal service', 'mail', 'courier'],
    'public_toilets': ['toilet', 'restroom', 'washroom', 'public toilet', 'loo', 'bathroom'],
    'parks': ['park', 'garden', 'green space', 'walking path'],
    'lakes': ['lake', 'pond', 'water body', 'tank'],

    // Bus Services subcategories
    'bus_stops_shelters': ['bus stop', 'bus shelter', 'bus stand', 'shelter'],
    'bus_seating': ['bus seat', 'seating', 'seats', 'no seat'],
    'bus_frequency': ['bus frequency', 'bus timing', 'bus schedule', 'no bus', 'waiting'],
    'bus_condition': ['bus condition', 'broken bus', 'dirty bus', 'old bus'],
    'bus_route_info': ['bus route', 'route number', 'bus information', 'which bus'],

    // Law and Order subcategories
    'theft_burglary': ['theft', 'burglary', 'robbery', 'stolen', 'break in'],
    'dowry': ['dowry', 'dowry harassment', 'dowry demand'],
    'sexual_assault': ['sexual assault', 'rape', 'molestation', 'harassment', 'abuse'],
    'arson': ['arson', 'fire', 'burning', 'set fire'],
    'cybercrime': ['cybercrime', 'online fraud', 'hacking', 'phishing', 'cyber attack'],

    // Drainage subcategories
    'flooding': ['flooding', 'flood', 'water logging', 'waterlogged', 'inundation'],
    'broken_drain': ['broken drain', 'damaged drain', 'drain damage', 'cracked drain'],
    'sewage_contamination': ['sewage contamination', 'sewage in water', 'contaminated water', 'dirty water'],

    // Elections subcategories
    'poll_booths': ['poll booth', 'polling station', 'voting booth', 'election center'],
    'voter_enrollment': ['voter enrollment', 'voter registration', 'voter list', 'voter roll', 'voter id'],
    'opinion_polls': ['opinion poll', 'exit poll', 'election survey'],

    // Environment subcategories
    'air_quality': ['air quality', 'pollution', 'smog', 'smoke', 'air pollution', 'dust'],
    'trees_vegetation': ['tree', 'trees', 'vegetation', 'plants', 'greenery', 'fallen tree', 'tree cutting', 'pruning'],

    // Water subcategories
    'water_supply': ['water supply', 'no water', 'water cut', 'water shortage', 'dry tap', 'no supply'],
    'water_smell': ['water smell', 'bad smell', 'foul smell', 'stinking water', 'smelly water'],
    'water_colour': ['water colour', 'water color', 'dirty water', 'brown water', 'yellow water', 'cloudy water'],
    'pipe_leak': ['pipe leak', 'leakage', 'water leak', 'burst pipe', 'broken pipe', 'leaking pipe'],

    // Buildings subcategories
    'illegal_construction': ['illegal construction', 'unauthorized construction', 'illegal building', 'encroachment'],
    'encroachment': ['encroachment', 'illegal occupation', 'land grab', 'unauthorized occupation'],
    'dangerous_building': ['dangerous building', 'unsafe building', 'collapsing building', 'dilapidated building'],

    // Civic Issues subcategories
    'loud_noise': ['loud noise', 'noise pollution', 'noise', 'loud music', 'disturbance', 'sound pollution'],
    'stray_animals': ['stray animals', 'stray dogs', 'stray cattle', 'stray cow', 'dogs', 'cattle'],

    // Power Supply subcategories
    'power_cut': ['power cut', 'no power', 'electricity cut', 'power outage', 'blackout', 'no electricity', 'no light'],
    'dangling_wire': ['dangling wire', 'hanging wire', 'loose wire', 'exposed wire', 'dangerous wire'],
    'defective_meter': ['meter', 'defective meter', 'broken meter', 'meter not working'],
    'power_surge': ['power surge', 'voltage fluctuation', 'high voltage', 'low voltage'],
    'transformer': ['transformer', 'transformer noise', 'transformer leaking', 'transformer issue'],
    'illegal_connection': ['illegal connection', 'illegal electricity', 'power theft', 'unauthorized connection'],

    // Roads, Traffic and Transport subcategories
    'road_conditions': ['road', 'pothole', 'road damage', 'bad road', 'broken road', 'road condition', 'road repair', 'crater', 'hole'],
    'traffic_management': ['traffic', 'traffic jam', 'congestion', 'traffic management', 'traffic police'],
    'traffic_signals': ['signal', 'traffic signal', 'traffic light', 'signal not working', 'red light'],
    'footpaths': ['footpath', 'pavement', 'sidewalk', 'walking path', 'pedestrian path'],
    'signage': ['signage', 'road sign', 'traffic sign', 'direction board', 'sign board'],
    'street_lights': ['street light', 'streetlight', 'street lamp', 'light not working', 'no light', 'dark street', 'lamp', 'light pole'],

    // Safety subcategories
    'safety_children': ['children safety', 'child safety', 'kids safety', 'school safety'],
    'safety_elders': ['elder safety', 'senior citizen', 'old age', 'elderly'],
    'safety_roads': ['road safety', 'pedestrian safety', 'crossing', 'zebra crossing'],
    'safety_fire': ['fire', 'fire safety', 'fire hazard', 'fire risk', 'fire accident'],
    'safety_food': ['food safety', 'food poisoning', 'unhygienic food', 'bad food'],

    // Sewage subcategories
    'sewage_dumping': ['sewage dumping', 'sewage disposal', 'sewage', 'waste water dumping'],
    'drain_overflow': ['drain overflow', 'drain overflowing', 'blocked drain', 'clogged drain', 'drain block', 'choked drain'],
    'water_contamination': ['water contamination', 'contaminated water', 'polluted water', 'impure water'],

    // Parent categories
    'city_amenities': ['amenities', 'facilities', 'public facilities'],
    'bus_services': ['bus', 'public transport', 'bmtc', 'transport'],
    'law_order': ['police', 'law', 'order', 'crime', 'safety', 'security'],
    'drainage': ['drain', 'drainage', 'water drainage', 'storm water'],
    'elections': ['election', 'voting', 'vote', 'voter'],
    'environment': ['environment', 'pollution', 'ecology', 'nature'],
    'water': ['water', 'drinking water', 'water supply'],
    'buildings': ['building', 'construction', 'structure'],
    'civic_issues': ['civic', 'civic issue', 'public nuisance'],
    'power_supply': ['power', 'electricity', 'electrical', 'current'],
    'roads_traffic': ['road', 'traffic', 'transport', 'vehicle'],
    'safety': ['safety', 'security', 'protection'],
    'sewage': ['sewage', 'waste water', 'sewerage']
};

async function addKeywords() {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
        console.error('❌ Error: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set');
        process.exit(1);
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    console.log('📝 Adding keywords to issue categories...\n');

    let successCount = 0;
    let errorCount = 0;

    for (const [code, keywords] of Object.entries(categoryKeywords)) {
        try {
            const { error } = await supabase
                .from('issue_categories')
                .update({ keywords })
                .eq('code', code);

            if (error) {
                console.error(`   ❌ Failed: ${code} - ${error.message}`);
                errorCount++;
            } else {
                console.log(`   ✅ Updated: ${code} (${keywords.length} keywords)`);
                successCount++;
            }
        } catch (err) {
            console.error(`   ❌ Failed: ${code} - ${err.message}`);
            errorCount++;
        }
    }

    console.log(`\n📊 Migration Results:`);
    console.log(`   ✅ Success: ${successCount}/${Object.keys(categoryKeywords).length}`);
    console.log(`   ❌ Errors: ${errorCount}`);

    if (errorCount === 0) {
        console.log('\n✨ All keywords added successfully!');

        // Verify by fetching a sample
        const { data } = await supabase
            .from('issue_categories')
            .select('code, name, keywords')
            .eq('code', 'street_lights')
            .single();

        if (data) {
            console.log('\n🔍 Sample verification:');
            console.log(`   ${data.name} (${data.code})`);
            console.log(`   Keywords: [${data.keywords.join(', ')}]`);
        }
    }
}

addKeywords().catch(err => {
    console.error('💥 Failed:', err);
    process.exit(1);
});
