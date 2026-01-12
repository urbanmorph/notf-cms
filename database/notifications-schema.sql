-- =====================================================
-- NOTIFICATION SYSTEM SCHEMA
-- Additional tables for Email/SMS notifications
-- Run this AFTER the main schema.sql
-- =====================================================

-- =====================================================
-- NOTIFICATION TEMPLATES TABLE
-- =====================================================

CREATE TABLE notification_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    subject VARCHAR(255), -- For email
    body_template TEXT NOT NULL, -- Supports {{variables}}
    sms_template VARCHAR(160), -- Short version for SMS
    channels TEXT[] DEFAULT ARRAY['email'], -- 'email', 'sms', 'push'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default templates
INSERT INTO notification_templates (code, name, description, subject, body_template, sms_template, channels) VALUES

-- Citizen notifications
('complaint_submitted', 'Complaint Submitted', 'Sent when a new complaint is submitted',
 'Complaint Received - {{complaint_number}}',
 'Dear {{citizen_name}},

Your complaint has been successfully submitted to {{corporation_name}}.

Complaint Details:
- Complaint Number: {{complaint_number}}
- Issue: {{title}}
- Category: {{department_name}}
- Submitted On: {{created_at}}

You can track your complaint status at: {{track_url}}

Thank you for helping us improve our city.

Greater Bengaluru Authority',
 'GBA: Complaint {{complaint_number}} received. Track at {{track_url}}',
 ARRAY['email', 'sms']),

('complaint_assigned', 'Complaint Assigned', 'Sent when complaint is assigned to an officer',
 'Complaint {{complaint_number}} - Assigned',
 'Dear {{citizen_name}},

Your complaint ({{complaint_number}}) has been assigned to our team.

Assignment Details:
- Assigned To: {{officer_name}}
- Department: {{department_name}}
- Expected Resolution: Within {{sla_hours}} hours

Track status: {{track_url}}

Greater Bengaluru Authority',
 'GBA: Complaint {{complaint_number}} assigned. Expected resolution in {{sla_hours}}h.',
 ARRAY['email', 'sms']),

('complaint_in_progress', 'Work In Progress', 'Sent when work begins on the complaint',
 'Complaint {{complaint_number}} - Work Started',
 'Dear {{citizen_name}},

Good news! Work has started on your complaint ({{complaint_number}}).

Our team is actively working on resolving your issue. You will be notified once it is resolved.

Track status: {{track_url}}

Greater Bengaluru Authority',
 'GBA: Work started on {{complaint_number}}. Track at {{track_url}}',
 ARRAY['email', 'sms']),

('complaint_resolved', 'Complaint Resolved', 'Sent when complaint is marked resolved',
 'Complaint {{complaint_number}} - Resolved',
 'Dear {{citizen_name}},

We are pleased to inform you that your complaint ({{complaint_number}}) has been resolved.

Resolution Details:
- Resolved On: {{resolved_at}}
- Resolution Time: {{resolution_time}}

We would appreciate your feedback on how we handled your complaint.

Track details: {{track_url}}

Thank you for your patience.

Greater Bengaluru Authority',
 'GBA: Complaint {{complaint_number}} resolved! We appreciate your feedback.',
 ARRAY['email', 'sms']),

('complaint_rejected', 'Complaint Rejected', 'Sent when complaint is rejected',
 'Complaint {{complaint_number}} - Update',
 'Dear {{citizen_name}},

We regret to inform you that your complaint ({{complaint_number}}) could not be processed.

Reason: {{rejection_reason}}

If you believe this is an error, please contact our support or submit a new complaint with additional details.

Greater Bengaluru Authority',
 'GBA: Complaint {{complaint_number}} could not be processed. Contact support for details.',
 ARRAY['email', 'sms']),

-- Admin notifications
('new_complaint_admin', 'New Complaint Alert (Admin)', 'Sent to admins for new high-priority complaints',
 '[URGENT] New {{priority}} Priority Complaint - {{complaint_number}}',
 'A new {{priority}} priority complaint has been submitted.

Complaint: {{complaint_number}}
Title: {{title}}
Department: {{department_name}}
Location: {{address}}
SLA Deadline: {{sla_deadline}}

Please assign this complaint promptly.

View in dashboard: {{admin_url}}',
 NULL,
 ARRAY['email']),

('sla_warning', 'SLA Warning', 'Sent when complaint approaches SLA deadline',
 '[WARNING] SLA Approaching - {{complaint_number}}',
 'Complaint {{complaint_number}} is approaching its SLA deadline.

Details:
- Title: {{title}}
- SLA Deadline: {{sla_deadline}}
- Time Remaining: {{hours_remaining}} hours
- Assigned To: {{officer_name}}

Please ensure timely resolution.

View in dashboard: {{admin_url}}',
 NULL,
 ARRAY['email']),

('sla_breach', 'SLA Breach Alert', 'Sent when SLA is breached',
 '[ALERT] SLA Breached - {{complaint_number}}',
 'URGENT: Complaint {{complaint_number}} has breached its SLA.

Details:
- Title: {{title}}
- SLA Deadline: {{sla_deadline}}
- Overdue By: {{hours_overdue}} hours
- Assigned To: {{officer_name}}
- Department: {{department_name}}

Immediate action required. This complaint needs escalation.

View in dashboard: {{admin_url}}',
 NULL,
 ARRAY['email']);

-- =====================================================
-- NOTIFICATION LOG TABLE
-- =====================================================

CREATE TABLE notification_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_id UUID REFERENCES complaints(id) ON DELETE SET NULL,
    template_id UUID REFERENCES notification_templates(id) ON DELETE SET NULL,
    recipient_type VARCHAR(20) NOT NULL, -- 'citizen', 'admin', 'officer'
    recipient_email VARCHAR(255),
    recipient_phone VARCHAR(20),
    channel VARCHAR(20) NOT NULL, -- 'email', 'sms', 'push'
    subject VARCHAR(255),
    body TEXT,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'sent', 'failed', 'delivered'
    error_message TEXT,
    sent_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_notification_log_complaint ON notification_log(complaint_id);
CREATE INDEX idx_notification_log_status ON notification_log(status);

-- =====================================================
-- NOTIFICATION PREFERENCES TABLE
-- =====================================================

CREATE TABLE notification_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_user_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
    email_enabled BOOLEAN DEFAULT true,
    sms_enabled BOOLEAN DEFAULT false,
    push_enabled BOOLEAN DEFAULT false,
    notify_new_complaints BOOLEAN DEFAULT true,
    notify_sla_warnings BOOLEAN DEFAULT true,
    notify_sla_breaches BOOLEAN DEFAULT true,
    notify_escalations BOOLEAN DEFAULT true,
    quiet_hours_start TIME,
    quiet_hours_end TIME,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(admin_user_id)
);

-- =====================================================
-- FUNCTION: Send Notification
-- This is a placeholder - actual implementation will be in Edge Functions
-- =====================================================

CREATE OR REPLACE FUNCTION queue_notification(
    p_complaint_id UUID,
    p_template_code VARCHAR,
    p_recipient_type VARCHAR,
    p_channels TEXT[] DEFAULT ARRAY['email']
)
RETURNS UUID AS $$
DECLARE
    v_template notification_templates%ROWTYPE;
    v_complaint complaints%ROWTYPE;
    v_notification_id UUID;
    v_channel TEXT;
    v_recipient_email VARCHAR;
    v_recipient_phone VARCHAR;
BEGIN
    -- Get template
    SELECT * INTO v_template FROM notification_templates
    WHERE code = p_template_code AND is_active = true;

    IF NOT FOUND THEN
        RETURN NULL;
    END IF;

    -- Get complaint
    SELECT * INTO v_complaint FROM complaints WHERE id = p_complaint_id;

    IF NOT FOUND THEN
        RETURN NULL;
    END IF;

    -- Determine recipient
    IF p_recipient_type = 'citizen' THEN
        v_recipient_email := v_complaint.citizen_email;
        v_recipient_phone := v_complaint.citizen_phone;
    END IF;

    -- Create notification log entries for each channel
    FOREACH v_channel IN ARRAY p_channels
    LOOP
        IF v_channel = 'email' AND v_recipient_email IS NOT NULL THEN
            INSERT INTO notification_log (
                complaint_id, template_id, recipient_type,
                recipient_email, channel, subject, body, status
            ) VALUES (
                p_complaint_id, v_template.id, p_recipient_type,
                v_recipient_email, 'email', v_template.subject, v_template.body_template, 'pending'
            ) RETURNING id INTO v_notification_id;
        ELSIF v_channel = 'sms' AND v_recipient_phone IS NOT NULL THEN
            INSERT INTO notification_log (
                complaint_id, template_id, recipient_type,
                recipient_phone, channel, body, status
            ) VALUES (
                p_complaint_id, v_template.id, p_recipient_type,
                v_recipient_phone, 'sms', v_template.sms_template, 'pending'
            ) RETURNING id INTO v_notification_id;
        END IF;
    END LOOP;

    RETURN v_notification_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGER: Auto-notify on status changes
-- =====================================================

CREATE OR REPLACE FUNCTION notify_on_status_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Only proceed if status actually changed
    IF OLD.status IS NOT DISTINCT FROM NEW.status THEN
        RETURN NEW;
    END IF;

    -- Queue notifications based on new status
    CASE NEW.status
        WHEN 'assigned' THEN
            PERFORM queue_notification(NEW.id, 'complaint_assigned', 'citizen', ARRAY['email', 'sms']);
        WHEN 'in_progress' THEN
            PERFORM queue_notification(NEW.id, 'complaint_in_progress', 'citizen', ARRAY['email', 'sms']);
        WHEN 'resolved' THEN
            PERFORM queue_notification(NEW.id, 'complaint_resolved', 'citizen', ARRAY['email', 'sms']);
        WHEN 'rejected' THEN
            PERFORM queue_notification(NEW.id, 'complaint_rejected', 'citizen', ARRAY['email', 'sms']);
        ELSE
            -- No notification for other statuses
    END CASE;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notify_complaint_status_change
    AFTER UPDATE ON complaints
    FOR EACH ROW
    EXECUTE FUNCTION notify_on_status_change();

-- =====================================================
-- TRIGGER: Notify on new complaint
-- =====================================================

CREATE OR REPLACE FUNCTION notify_on_new_complaint()
RETURNS TRIGGER AS $$
BEGIN
    -- Notify citizen
    PERFORM queue_notification(NEW.id, 'complaint_submitted', 'citizen', ARRAY['email', 'sms']);

    -- Notify admins for high priority complaints
    IF NEW.priority IN ('critical', 'high') THEN
        PERFORM queue_notification(NEW.id, 'new_complaint_admin', 'admin', ARRAY['email']);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notify_new_complaint
    AFTER INSERT ON complaints
    FOR EACH ROW
    EXECUTE FUNCTION notify_on_new_complaint();

-- =====================================================
-- TRIGGER: SLA Breach Detection
-- Run periodically via pg_cron or Edge Function
-- =====================================================

CREATE OR REPLACE FUNCTION check_sla_breaches()
RETURNS INTEGER AS $$
DECLARE
    v_count INTEGER := 0;
    v_complaint RECORD;
BEGIN
    -- Find complaints that just breached SLA
    FOR v_complaint IN
        SELECT c.id, c.complaint_number
        FROM complaints c
        WHERE c.sla_deadline < NOW()
        AND c.sla_breached = false
        AND c.status NOT IN ('resolved', 'closed', 'rejected')
    LOOP
        -- Mark as breached
        UPDATE complaints SET sla_breached = true WHERE id = v_complaint.id;

        -- Queue notification
        PERFORM queue_notification(v_complaint.id, 'sla_breach', 'admin', ARRAY['email']);

        v_count := v_count + 1;
    END LOOP;

    -- Find complaints approaching SLA (within 12 hours)
    FOR v_complaint IN
        SELECT c.id, c.complaint_number
        FROM complaints c
        WHERE c.sla_deadline BETWEEN NOW() AND NOW() + INTERVAL '12 hours'
        AND c.sla_breached = false
        AND c.status NOT IN ('resolved', 'closed', 'rejected')
        AND NOT EXISTS (
            SELECT 1 FROM notification_log nl
            WHERE nl.complaint_id = c.id
            AND nl.template_id = (SELECT id FROM notification_templates WHERE code = 'sla_warning')
            AND nl.created_at > NOW() - INTERVAL '12 hours'
        )
    LOOP
        -- Queue warning notification
        PERFORM queue_notification(v_complaint.id, 'sla_warning', 'admin', ARRAY['email']);
    END LOOP;

    RETURN v_count;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- VIEW: Pending Notifications
-- For Edge Function to pick up and process
-- =====================================================

CREATE OR REPLACE VIEW pending_notifications AS
SELECT
    nl.*,
    c.complaint_number,
    c.title,
    c.description,
    c.citizen_name,
    c.address,
    c.created_at as complaint_created_at,
    c.resolved_at,
    c.sla_deadline,
    d.name as department_name,
    corp.name as corporation_name,
    au.name as officer_name
FROM notification_log nl
JOIN complaints c ON nl.complaint_id = c.id
LEFT JOIN departments d ON c.department_id = d.id
LEFT JOIN corporations corp ON c.corporation_id = corp.id
LEFT JOIN admin_users au ON c.assigned_to = au.id
WHERE nl.status = 'pending'
ORDER BY nl.created_at;
