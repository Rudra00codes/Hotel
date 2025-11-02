// Example usage of custom UI components
import React from 'react';
import { 
  Button, 
  Card, 
  Input, 
  Badge, 
  Avatar, 
  Container, 
  CountUp,
  SplitText
} from './index';

// Example component showcasing UI library usage
export const UIExamples: React.FC = () => {
  return (
    <Container maxWidth="4xl" padding="lg">
      <div className="space-y-8">
        
        {/* SplitText Examples */}
        <Card padding="lg" shadow="md">
          <h2 className="text-2xl font-bold mb-4">SplitText Animations</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Character Animation</h3>
              <SplitText
                text="Welcome to Deewan Residency"
                tag="h2"
                className="text-3xl font-bold text-gray-900"
                splitType="chars"
                delay={50}
                duration={0.8}
                from={{ opacity: 0, y: 50, rotationX: -90 }}
                to={{ opacity: 1, y: 0, rotationX: 0 }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Word Animation</h3>
              <SplitText
                text="Experience luxury and comfort in the heart of Derabassi"
                tag="p"
                className="text-xl text-gray-600"
                splitType="words"
                delay={80}
                duration={0.6}
                from={{ opacity: 0, y: 30, scale: 0.8 }}
                to={{ opacity: 1, y: 0, scale: 1 }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Line Animation</h3>
              <SplitText
                text="Book your perfect stay today and discover why guests choose Deewan Residency for their accommodation needs in Punjab."
                tag="p"
                className="text-base text-gray-500 leading-relaxed"
                splitType="lines"
                delay={100}
                duration={0.7}
                from={{ opacity: 0, x: -50 }}
                to={{ opacity: 1, x: 0 }}
              />
            </div>
          </div>
        </Card>

        {/* CountUp Examples */}
        <Card padding="lg" shadow="md">
          <h2 className="text-2xl font-bold mb-4">CountUp Animations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <CountUp
                  to={150}
                  from={0}
                  duration={2.5}
                  delay={0.2}
                  separator=","
                  className="tabular-nums"
                />+
              </div>
              <p className="text-gray-600">Happy Guests</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                <CountUp
                  to={25}
                  from={0}
                  duration={2.0}
                  delay={0.4}
                  className="tabular-nums"
                />+
              </div>
              <p className="text-gray-600">Rooms Available</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                <CountUp
                  to={4.8}
                  from={0}
                  duration={1.8}
                  delay={0.6}
                  className="tabular-nums"
                />⭐
              </div>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>
        </Card>

        {/* Buttons */}
        <Card padding="lg" shadow="md">
          <h2 className="text-2xl font-bold mb-4">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="sm">Primary Small</Button>
            <Button variant="secondary" size="md">Secondary Medium</Button>
            <Button variant="success" size="lg">Success Large</Button>
            <Button variant="warning" loading>Loading...</Button>
            <Button variant="error" disabled>Disabled</Button>
          </div>
        </Card>

        {/* Hotel-specific Example */}
        <Card padding="lg" shadow="lg" glass>
          <SplitText
            text="Hotel Booking Experience"
            tag="h2"
            className="text-2xl font-bold mb-4"
            splitType="words"
            delay={60}
            duration={0.7}
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
          />
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar size="lg" name="Deewan Residency" />
              <div>
                <h3 className="font-semibold">Deewan Residency</h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="success" size="sm">Available</Badge>
                  <Badge variant="info" size="sm">Premium</Badge>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Check-in Date"
                type="date"
                glass
              />
              <Input 
                label="Check-out Date"
                type="date"
                glass
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button variant="secondary">Cancel</Button>
              <Button variant="primary" size="lg">
                Book Now
              </Button>
            </div>
          </div>
        </Card>

      </div>
    </Container>
  );
};

export default UIExamples;