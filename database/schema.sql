-- =====================================================
-- COMPLAINT MANAGEMENT SYSTEM - DATABASE SCHEMA
-- For Supabase PostgreSQL
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ENUM TYPES
-- =====================================================

CREATE TYPE complaint_status AS ENUM (
    'new',
    'assigned',
    'in_progress',
    'resolved',
    'closed',
    'rejected'
);

CREATE TYPE priority_level AS ENUM (
    'critical',
    'high',
    'medium',
    'low'
);

CREATE TYPE admin_role AS ENUM (
    'super_admin',
    'commissioner',
    'zone_officer',
    'department_head',
    'field_officer'
);

-- =====================================================
-- CORPORATIONS TABLE
-- =====================================================

CREATE TABLE corporations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    short_name VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert the 5 corporations
INSERT INTO corporations (code, name, short_name) VALUES
    ('north', 'Bengaluru North Corporation', 'North'),
    ('south', 'Bengaluru South Corporation', 'South'),
    ('east', 'Bengaluru East Corporation', 'East'),
    ('west', 'Bengaluru West Corporation', 'West'),
    ('central', 'Bengaluru Central Corporation', 'Central');

-- =====================================================
-- ZONES TABLE
-- =====================================================

CREATE TABLE zones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    corporation_id UUID REFERENCES corporations(id) ON DELETE CASCADE,
    code VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(corporation_id, code)
);

-- =====================================================
-- WARDS TABLE
-- =====================================================

CREATE TABLE wards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    zone_id UUID REFERENCES zones(id) ON DELETE CASCADE,
    ward_number INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- DEPARTMENTS TABLE
-- =====================================================

CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    default_sla_hours INTEGER DEFAULT 72,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert standard departments
INSERT INTO departments (code, name, description, default_sla_hours) VALUES
    ('electrical', 'Electrical / Street Lights', 'Street lighting, electrical infrastructure', 48),
    ('swm', 'Solid Waste Management', 'Garbage collection, waste disposal', 24),
    ('roads', 'Road Maintenance', 'Potholes, road repairs, footpaths', 72),
    ('water', 'Water Supply', 'Water supply issues, pipelines', 48),
    ('drainage', 'Drainage / Sewage', 'Drainage blocks, sewage overflow', 24),
    ('forest', 'Forest / Trees', 'Tree falls, pruning requests', 72),
    ('health', 'Health & Sanitation', 'Public health, sanitation', 48),
    ('animals', 'Stray Animals', 'Stray dogs, animal-related issues', 72),
    ('other', 'Other Issues', 'Miscellaneous complaints', 72);

-- =====================================================
-- ISSUE CATEGORIES TABLE
-- =====================================================

CREATE TABLE issue_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department_id UUID REFERENCES departments(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    parent_id UUID REFERENCES issue_categories(id) ON DELETE CASCADE,
    keywords TEXT[], -- For ML matching
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(department_id, code)
);

-- Insert main categories and subcategories
-- Electrical
INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'streetlight_not_working', 'Street Light Not Working',
    ARRAY['streetlight', 'street light', 'light not working', 'lamp', 'dark street', 'no light']
FROM departments d WHERE d.code = 'electrical';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'streetlight_flickering', 'Street Light Flickering',
    ARRAY['flickering', 'blinking', 'flashing light', 'unstable light']
FROM departments d WHERE d.code = 'electrical';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'electrical_wire', 'Exposed/Dangling Wires',
    ARRAY['wire', 'cable', 'exposed wire', 'dangling', 'electric cable', 'dangerous wire']
FROM departments d WHERE d.code = 'electrical';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'transformer', 'Transformer Issues',
    ARRAY['transformer', 'power cut', 'electricity', 'power failure']
FROM departments d WHERE d.code = 'electrical';

-- SWM
INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'garbage_not_collected', 'Garbage Not Collected',
    ARRAY['garbage', 'waste', 'not collected', 'rubbish', 'trash', 'no pickup']
FROM departments d WHERE d.code = 'swm';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'garbage_dump', 'Illegal Garbage Dump',
    ARRAY['dump', 'dumping', 'illegal dump', 'garbage pile', 'waste dump']
FROM departments d WHERE d.code = 'swm';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'dustbin', 'Dustbin Overflow/Missing',
    ARRAY['dustbin', 'bin', 'overflow', 'full bin', 'no dustbin']
FROM departments d WHERE d.code = 'swm';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'debris', 'Construction Debris',
    ARRAY['debris', 'construction waste', 'rubble', 'building waste']
FROM departments d WHERE d.code = 'swm';

-- Roads
INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'pothole', 'Pothole',
    ARRAY['pothole', 'hole', 'pit', 'road damage', 'crater']
FROM departments d WHERE d.code = 'roads';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'road_damage', 'Road Damage/Cracks',
    ARRAY['road damage', 'crack', 'broken road', 'road repair']
FROM departments d WHERE d.code = 'roads';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'footpath', 'Footpath Issues',
    ARRAY['footpath', 'pavement', 'sidewalk', 'walking path', 'pedestrian']
FROM departments d WHERE d.code = 'roads';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'speed_breaker', 'Speed Breaker Issues',
    ARRAY['speed breaker', 'bump', 'hump', 'speed bump']
FROM departments d WHERE d.code = 'roads';

-- Water
INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'no_water', 'No Water Supply',
    ARRAY['no water', 'water supply', 'water cut', 'dry tap', 'no supply']
FROM departments d WHERE d.code = 'water';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'low_pressure', 'Low Water Pressure',
    ARRAY['low pressure', 'weak flow', 'pressure', 'slow water']
FROM departments d WHERE d.code = 'water';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'pipe_leak', 'Water Pipe Leakage',
    ARRAY['leak', 'leakage', 'pipe burst', 'water leak', 'broken pipe']
FROM departments d WHERE d.code = 'water';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'dirty_water', 'Contaminated/Dirty Water',
    ARRAY['dirty water', 'contaminated', 'muddy', 'brown water', 'smell']
FROM departments d WHERE d.code = 'water';

-- Drainage
INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'drain_block', 'Blocked Drain',
    ARRAY['blocked', 'clogged', 'drain block', 'choked drain', 'overflow']
FROM departments d WHERE d.code = 'drainage';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'sewage_overflow', 'Sewage Overflow',
    ARRAY['sewage', 'overflow', 'sewage leak', 'sewage smell', 'manhole']
FROM departments d WHERE d.code = 'drainage';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'manhole', 'Open/Damaged Manhole',
    ARRAY['manhole', 'open manhole', 'manhole cover', 'missing cover']
FROM departments d WHERE d.code = 'drainage';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'waterlogging', 'Waterlogging',
    ARRAY['waterlogging', 'flooding', 'water stagnation', 'rain water', 'flood']
FROM departments d WHERE d.code = 'drainage';

-- Forest/Trees
INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'tree_fall', 'Fallen Tree',
    ARRAY['fallen tree', 'tree fall', 'uprooted', 'tree down']
FROM departments d WHERE d.code = 'forest';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'tree_pruning', 'Tree Pruning Required',
    ARRAY['pruning', 'overgrown', 'branches', 'trim tree', 'cutting']
FROM departments d WHERE d.code = 'forest';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'dangerous_tree', 'Dangerous/Leaning Tree',
    ARRAY['dangerous', 'leaning', 'about to fall', 'risky tree']
FROM departments d WHERE d.code = 'forest';

-- Health
INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'mosquito', 'Mosquito Breeding',
    ARRAY['mosquito', 'breeding', 'dengue', 'malaria', 'stagnant water']
FROM departments d WHERE d.code = 'health';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'public_toilet', 'Public Toilet Issues',
    ARRAY['toilet', 'public toilet', 'urinal', 'bathroom', 'restroom']
FROM departments d WHERE d.code = 'health';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'dead_animal', 'Dead Animal Removal',
    ARRAY['dead animal', 'carcass', 'dead dog', 'dead cat', 'animal body']
FROM departments d WHERE d.code = 'health';

-- Animals
INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'stray_dogs', 'Stray Dogs Menace',
    ARRAY['stray dog', 'dog', 'dogs', 'barking', 'dog bite', 'aggressive dog']
FROM departments d WHERE d.code = 'animals';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'stray_cattle', 'Stray Cattle',
    ARRAY['cattle', 'cow', 'bull', 'stray cattle', 'animals on road']
FROM departments d WHERE d.code = 'animals';

INSERT INTO issue_categories (department_id, code, name, keywords)
SELECT d.id, 'animal_rescue', 'Animal Rescue',
    ARRAY['rescue', 'injured animal', 'trapped', 'animal help']
FROM departments d WHERE d.code = 'animals';

-- =====================================================
-- ADMIN USERS TABLE
-- =====================================================

CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    corporation_id UUID REFERENCES corporations(id) ON DELETE SET NULL,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    zone_id UUID REFERENCES zones(id) ON DELETE SET NULL,
    role admin_role NOT NULL DEFAULT 'field_officer',
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- =====================================================
-- ADMIN USER CORPORATIONS (Multi-Corporation Access)
-- =====================================================
-- Junction table for users who need access to multiple corporations
-- Note: admin_users.corporation_id is the PRIMARY/default corporation
-- This table allows ADDITIONAL corporation access

CREATE TABLE admin_user_corporations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_user_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    corporation_id UUID NOT NULL REFERENCES corporations(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT false,
    can_manage BOOLEAN DEFAULT true,  -- Can manage complaints (vs read-only)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES admin_users(id),
    UNIQUE(admin_user_id, corporation_id)
);

-- Index for faster lookups
CREATE INDEX idx_admin_user_corps_admin ON admin_user_corporations(admin_user_id);
CREATE INDEX idx_admin_user_corps_corp ON admin_user_corporations(corporation_id);

-- =====================================================
-- COMPLAINTS TABLE
-- =====================================================

CREATE TABLE complaints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_number VARCHAR(50) UNIQUE NOT NULL,

    -- Location
    corporation_id UUID REFERENCES corporations(id),
    zone_id UUID REFERENCES zones(id),
    ward_id UUID REFERENCES wards(id),
    address TEXT,
    landmark TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),

    -- Classification
    department_id UUID REFERENCES departments(id),
    category_id UUID REFERENCES issue_categories(id),

    -- Details
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,

    -- Status & Priority
    status complaint_status DEFAULT 'new',
    priority priority_level DEFAULT 'medium',

    -- ML Classification
    ml_department_id UUID REFERENCES departments(id),
    ml_category_id UUID REFERENCES issue_categories(id),
    ml_confidence DECIMAL(5, 4),
    ml_suggested_zone_id UUID REFERENCES zones(id),

    -- Assignment
    assigned_to UUID REFERENCES admin_users(id),
    assigned_at TIMESTAMP WITH TIME ZONE,
    assigned_by UUID REFERENCES admin_users(id),

    -- Citizen Info
    citizen_name VARCHAR(100),
    citizen_phone VARCHAR(20),
    citizen_email VARCHAR(255),

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    closed_at TIMESTAMP WITH TIME ZONE,

    -- SLA
    sla_deadline TIMESTAMP WITH TIME ZONE,
    sla_breached BOOLEAN DEFAULT false
);

-- Create index for faster queries
CREATE INDEX idx_complaints_corporation ON complaints(corporation_id);
CREATE INDEX idx_complaints_status ON complaints(status);
CREATE INDEX idx_complaints_department ON complaints(department_id);
CREATE INDEX idx_complaints_assigned ON complaints(assigned_to);
CREATE INDEX idx_complaints_created ON complaints(created_at DESC);
CREATE INDEX idx_complaints_sla ON complaints(sla_deadline) WHERE NOT sla_breached;

-- =====================================================
-- COMPLAINT ATTACHMENTS TABLE
-- =====================================================

CREATE TABLE complaint_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_type VARCHAR(50),
    file_size INTEGER,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- COMPLAINT HISTORY TABLE (Audit Log)
-- =====================================================

CREATE TABLE complaint_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
    action VARCHAR(50) NOT NULL,
    old_value JSONB,
    new_value JSONB,
    changed_by UUID REFERENCES admin_users(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_history_complaint ON complaint_history(complaint_id);

-- =====================================================
-- COMPLAINT COMMENTS TABLE
-- =====================================================

CREATE TABLE complaint_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
    admin_user_id UUID REFERENCES admin_users(id),
    comment TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ML CLASSIFICATION RULES TABLE
-- =====================================================

CREATE TABLE ml_classification_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rule_name VARCHAR(100) NOT NULL,
    rule_type VARCHAR(50) NOT NULL, -- 'keyword', 'pattern', 'location'
    pattern TEXT NOT NULL,
    department_id UUID REFERENCES departments(id),
    category_id UUID REFERENCES issue_categories(id),
    zone_id UUID REFERENCES zones(id),
    priority priority_level,
    weight INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- GENERATE COMPLAINT NUMBER FUNCTION
-- =====================================================

CREATE OR REPLACE FUNCTION generate_complaint_number()
RETURNS TRIGGER AS $$
DECLARE
    corp_code VARCHAR(3);
    year_code VARCHAR(2);
    seq_num INTEGER;
BEGIN
    -- Get corporation code
    SELECT UPPER(SUBSTRING(code, 1, 3)) INTO corp_code
    FROM corporations WHERE id = NEW.corporation_id;

    IF corp_code IS NULL THEN
        corp_code := 'GEN';
    END IF;

    -- Get year code
    year_code := TO_CHAR(NOW(), 'YY');

    -- Get sequence number for this year
    SELECT COALESCE(MAX(
        CAST(SUBSTRING(complaint_number FROM '[0-9]+$') AS INTEGER)
    ), 0) + 1 INTO seq_num
    FROM complaints
    WHERE complaint_number LIKE corp_code || '-' || year_code || '-%';

    -- Generate complaint number: NOR-25-000001
    NEW.complaint_number := corp_code || '-' || year_code || '-' || LPAD(seq_num::TEXT, 6, '0');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_complaint_number
    BEFORE INSERT ON complaints
    FOR EACH ROW
    WHEN (NEW.complaint_number IS NULL)
    EXECUTE FUNCTION generate_complaint_number();

-- =====================================================
-- UPDATE TIMESTAMP FUNCTION
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_complaints_timestamp
    BEFORE UPDATE ON complaints
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_admin_users_timestamp
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- =====================================================
-- SET SLA DEADLINE FUNCTION
-- =====================================================

CREATE OR REPLACE FUNCTION set_sla_deadline()
RETURNS TRIGGER AS $$
DECLARE
    sla_hours INTEGER;
BEGIN
    -- Get SLA hours from department
    SELECT default_sla_hours INTO sla_hours
    FROM departments WHERE id = NEW.department_id;

    IF sla_hours IS NOT NULL THEN
        NEW.sla_deadline := NEW.created_at + (sla_hours || ' hours')::INTERVAL;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_complaint_sla
    BEFORE INSERT ON complaints
    FOR EACH ROW
    WHEN (NEW.sla_deadline IS NULL AND NEW.department_id IS NOT NULL)
    EXECUTE FUNCTION set_sla_deadline();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaint_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaint_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_user_corporations ENABLE ROW LEVEL SECURITY;

-- Helper function to get all corporations a user has access to
CREATE OR REPLACE FUNCTION get_user_corporation_ids(user_uuid UUID)
RETURNS SETOF UUID AS $$
BEGIN
    RETURN QUERY
    -- Primary corporation from admin_users
    SELECT au.corporation_id FROM admin_users au WHERE au.user_id = user_uuid AND au.corporation_id IS NOT NULL
    UNION
    -- Additional corporations from junction table
    SELECT auc.corporation_id FROM admin_user_corporations auc
    JOIN admin_users au ON auc.admin_user_id = au.id
    WHERE au.user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policy: Admins can see complaints for their corporations (primary + additional)
CREATE POLICY admin_view_complaints ON complaints
    FOR SELECT
    USING (
        -- Check primary corporation OR additional corporations
        corporation_id IN (SELECT get_user_corporation_ids(auth.uid()))
        OR
        -- Super admins can see all
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE user_id = auth.uid() AND role = 'super_admin'
        )
    );

-- Policy: Admins can update complaints for their corporations
CREATE POLICY admin_update_complaints ON complaints
    FOR UPDATE
    USING (
        -- Check primary corporation OR additional corporations with manage permission
        corporation_id IN (
            SELECT corporation_id FROM admin_users WHERE user_id = auth.uid()
            UNION
            SELECT auc.corporation_id FROM admin_user_corporations auc
            JOIN admin_users au ON auc.admin_user_id = au.id
            WHERE au.user_id = auth.uid() AND auc.can_manage = true
        )
        OR
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE user_id = auth.uid() AND role = 'super_admin'
        )
    );

-- Policy: Anyone can insert complaints (public submission)
CREATE POLICY public_insert_complaints ON complaints
    FOR INSERT
    WITH CHECK (true);

-- Policy: Admins can view their own profile and commissioners can see their corp admins
CREATE POLICY admin_view_profile ON admin_users
    FOR SELECT
    USING (
        user_id = auth.uid()
        OR
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE user_id = auth.uid() AND role IN ('super_admin', 'commissioner')
        )
    );

-- Policy: Admins can view their own corporation assignments
CREATE POLICY admin_view_own_corporations ON admin_user_corporations
    FOR SELECT
    USING (
        admin_user_id IN (SELECT id FROM admin_users WHERE user_id = auth.uid())
        OR
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE user_id = auth.uid() AND role IN ('super_admin', 'commissioner')
        )
    );

-- Policy: Only super_admin and commissioner can manage corporation assignments
CREATE POLICY admin_manage_corporations ON admin_user_corporations
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE user_id = auth.uid() AND role IN ('super_admin', 'commissioner')
        )
    );

-- Policy: View history for complaints you can see
CREATE POLICY admin_view_history ON complaint_history
    FOR SELECT
    USING (
        complaint_id IN (
            SELECT id FROM complaints WHERE corporation_id IN (
                SELECT get_user_corporation_ids(auth.uid())
            )
        )
    );

-- Policy: View comments for complaints you can see
CREATE POLICY admin_view_comments ON complaint_comments
    FOR SELECT
    USING (
        complaint_id IN (
            SELECT id FROM complaints WHERE corporation_id IN (
                SELECT get_user_corporation_ids(auth.uid())
            )
        )
    );

-- =====================================================
-- VIEWS FOR DASHBOARD ANALYTICS
-- =====================================================

CREATE OR REPLACE VIEW complaint_stats AS
SELECT
    c.corporation_id,
    corp.name as corporation_name,
    c.status,
    c.priority,
    c.department_id,
    d.name as department_name,
    DATE_TRUNC('day', c.created_at) as complaint_date,
    DATE_TRUNC('month', c.created_at) as complaint_month,
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE c.sla_breached) as sla_breached_count,
    AVG(EXTRACT(EPOCH FROM (COALESCE(c.resolved_at, NOW()) - c.created_at))/3600)::INTEGER as avg_resolution_hours
FROM complaints c
LEFT JOIN corporations corp ON c.corporation_id = corp.id
LEFT JOIN departments d ON c.department_id = d.id
GROUP BY c.corporation_id, corp.name, c.status, c.priority, c.department_id, d.name,
         DATE_TRUNC('day', c.created_at), DATE_TRUNC('month', c.created_at);

-- =====================================================
-- SAMPLE DATA TRIGGER FOR COMPLAINT HISTORY
-- =====================================================

CREATE OR REPLACE FUNCTION log_complaint_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO complaint_history (complaint_id, action, old_value, new_value)
        VALUES (NEW.id, 'status_change',
                jsonb_build_object('status', OLD.status),
                jsonb_build_object('status', NEW.status));
    END IF;

    IF OLD.assigned_to IS DISTINCT FROM NEW.assigned_to THEN
        INSERT INTO complaint_history (complaint_id, action, old_value, new_value, changed_by)
        VALUES (NEW.id, 'assignment_change',
                jsonb_build_object('assigned_to', OLD.assigned_to),
                jsonb_build_object('assigned_to', NEW.assigned_to),
                NEW.assigned_by);
    END IF;

    IF OLD.priority IS DISTINCT FROM NEW.priority THEN
        INSERT INTO complaint_history (complaint_id, action, old_value, new_value)
        VALUES (NEW.id, 'priority_change',
                jsonb_build_object('priority', OLD.priority),
                jsonb_build_object('priority', NEW.priority));
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER log_complaint_history
    AFTER UPDATE ON complaints
    FOR EACH ROW
    EXECUTE FUNCTION log_complaint_changes();
